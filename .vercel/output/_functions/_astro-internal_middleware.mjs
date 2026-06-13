import { l as lucia } from './chunks/auth_BNOajhtQ.mjs';
import { e as defineMiddleware, s as sequence } from './chunks/render-context_KySmss7T.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_C4ngcWkh.mjs';
import 'piccolore';
import './chunks/astro/server_rOUT-VGP.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  context.locals.session = session;
  context.locals.user = user;
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
