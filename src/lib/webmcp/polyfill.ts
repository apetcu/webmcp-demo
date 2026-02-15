import type {
  ModelContext,
  ModelContextTool,
  ModelContextOptions,
  ModelContextClient,
  WebMCPDebug,
} from "./types";

function validateInput(
  schema: Record<string, unknown>,
  input: Record<string, unknown>
): string | null {
  // Validate top-level type
  if (schema.type === "object") {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
      return "Expected input to be an object";
    }

    // Validate required fields
    const required = schema.required;
    if (Array.isArray(required)) {
      for (const field of required) {
        if (!(field as string in input)) {
          return `Missing required field: ${field}`;
        }
      }
    }

    // Validate property types
    const properties = schema.properties as
      | Record<string, Record<string, unknown>>
      | undefined;
    if (properties) {
      for (const [key, propSchema] of Object.entries(properties)) {
        if (!(key in input)) continue;
        const value = input[key];
        const expectedType = propSchema.type as string | undefined;
        if (!expectedType) continue;

        let valid = true;
        switch (expectedType) {
          case "string":
            valid = typeof value === "string";
            break;
          case "number":
          case "integer":
            valid = typeof value === "number";
            break;
          case "boolean":
            valid = typeof value === "boolean";
            break;
          case "array":
            valid = Array.isArray(value);
            break;
          case "object":
            valid =
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value);
            break;
        }
        if (!valid) {
          return `Field "${key}" expected type "${expectedType}", got "${typeof value}"`;
        }
      }
    }
  }

  return null;
}

function createModelContext(): ModelContext {
  const baseTools = new Map<string, ModelContextTool>();
  const dynamicTools = new Map<string, ModelContextTool>();

  const callHistory: WebMCPDebug["callHistory"] = [];

  // Merged view of all tools
  function getAllTools(): Map<string, ModelContextTool> {
    const merged = new Map<string, ModelContextTool>();
    baseTools.forEach((tool, name) => merged.set(name, tool));
    dynamicTools.forEach((tool, name) => merged.set(name, tool));
    return merged;
  }

  // Wrap a tool's execute to add validation and call history tracking
  function wrapExecute(tool: ModelContextTool): ModelContextTool {
    const originalExecute = tool.execute;
    return {
      ...tool,
      execute: async (input, client) => {
        // Validate input against schema if present
        if (tool.inputSchema) {
          const error = validateInput(
            tool.inputSchema as Record<string, unknown>,
            input
          );
          if (error) {
            const entry = {
              tool: tool.name,
              input,
              timestamp: Date.now(),
              error,
            };
            callHistory.push(entry);
            throw new Error(`Input validation failed: ${error}`);
          }
        }

        const entry: (typeof callHistory)[number] = {
          tool: tool.name,
          input,
          timestamp: Date.now(),
        };

        try {
          const result = await originalExecute(input, client);
          entry.result = result;
          callHistory.push(entry);
          return result;
        } catch (err) {
          entry.error = err instanceof Error ? err.message : String(err);
          callHistory.push(entry);
          throw err;
        }
      },
    };
  }

  const modelContext: ModelContext = {
    provideContext(options?: ModelContextOptions): void {
      // Replace base tools only; dynamic tools persist
      baseTools.clear();
      if (options?.tools) {
        for (const tool of options.tools) {
          if (dynamicTools.has(tool.name)) {
            throw new Error(
              `Tool "${tool.name}" already registered as a dynamic tool`
            );
          }
          baseTools.set(tool.name, wrapExecute(tool));
        }
      }
      updateDebug();
    },

    clearContext(): void {
      baseTools.clear();
      dynamicTools.clear();
      updateDebug();
    },

    registerTool(tool: ModelContextTool): void {
      if (baseTools.has(tool.name) || dynamicTools.has(tool.name)) {
        throw new Error(`Tool "${tool.name}" is already registered`);
      }
      dynamicTools.set(tool.name, wrapExecute(tool));
      updateDebug();
    },

    unregisterTool(name: string): void {
      const deletedBase = baseTools.delete(name);
      const deletedDynamic = dynamicTools.delete(name);
      if (!deletedBase && !deletedDynamic) {
        throw new Error(`Tool "${name}" is not registered`);
      }
      updateDebug();
    },
  };

  // Debug interface
  const debug: WebMCPDebug = {
    tools: getAllTools(),
    callHistory,
  };

  function updateDebug() {
    debug.tools = getAllTools();
  }

  // Expose debug on window
  if (typeof window !== "undefined") {
    (window as unknown as Record<string, unknown>).__webmcp = debug;
  }

  return modelContext;
}

// Default ModelContextClient implementation
export function createModelContextClient(): ModelContextClient {
  return {
    requestUserInteraction: async (callback) => {
      return await callback();
    },
  };
}

export function initPolyfill(): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return;
  }

  // Skip if native implementation exists
  if ("modelContext" in navigator) {
    return;
  }

  const modelContext = createModelContext();

  Object.defineProperty(navigator, "modelContext", {
    value: modelContext,
    writable: false,
    enumerable: true,
    configurable: false,
  });
}
