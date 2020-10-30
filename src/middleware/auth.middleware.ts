export async function useAuthAuthMiddleware(req: any, res: any, next: any) {
  try {
    // @todo implement auth flow
  } catch (error) {
    console.error(error);
  } finally {
    return next();
  }
}
