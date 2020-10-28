export async function useFakeAuthAuthMiddleware(req: any, res: any, next: any) {
  try {
    // If this user already has a session, return
    if (!req.session?.user) {
      // Use fake user
      req.session.user = {
        username: 'dummyName',
        displayName: 'Dummy User',
        email: 'dummy.user@domain.com',
      };
    }
  } catch (error) {
    console.error(error);
  } finally {
    return next();
  }
}

export async function useAuthAuthMiddleware(req: any, res: any, next: any) {
  try {
    // @todo implement auth flow
  } catch (error) {
    console.error(error);
  } finally {
    return next();
  }
}
