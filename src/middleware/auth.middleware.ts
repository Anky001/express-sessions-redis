export async function useFakeAuthAuthMiddleware(req: any, res: any, next: any) {
  try {
    // If this user already has a session, return
    if (!req.session?.user) {
      // Use fake user
      req.session.user = {
        username: "dummyName",
        displayName: "Dummy User",
        email: "dummy.user@domain.com",
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
    // If this user already has a session, return
    if (!req.session?.user) {
      res.status(401).json({ message: "invalid users" });
      // setTimeout(() => {
      //   console.log("Faking authentication request");
      //   req.session.user = {
      //     username: "ankitpant",
      //     displayName: "Ankit Pant",
      //     email: "ankit12.pant@gmail.com",
      //   };
      // }, 10000);
    }
  } catch (error) {
    console.error(error);
  } finally {
    return next();
  }
}
