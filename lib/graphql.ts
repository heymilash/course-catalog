import { API_URL } from "@/lib/api";

export type GraphQLError = {
  message: string;
  path?: (string | number)[];
};

export class GraphQLRequestError extends Error {
  errors: GraphQLError[];

  constructor(errors: GraphQLError[]) {
    super(errors.map((error) => error.message).join("; "));
    this.name = "GraphQLRequestError";
    this.errors = errors;
  }
}

export async function gql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const body: { data: T | null; errors?: GraphQLError[] } = await response.json();
  if (body.errors?.length) throw new GraphQLRequestError(body.errors);
  return body.data as T;
}
