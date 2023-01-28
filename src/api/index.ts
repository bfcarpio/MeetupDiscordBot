import ClientOAuth2 from 'client-oauth2';
import { Request, Response } from 'express';
import { Logger } from 'tslog';
import Configuration from '../configuration';

const logger = new Logger({ name: 'Router' });

const meetupAuth = new ClientOAuth2({
  clientId: Configuration.meetupAPIKey,
  clientSecret: Configuration.meetupAPISecret,
  accessTokenUri: 'https://secure.meetup.com/oauth2/access',
  authorizationUri: 'https://secure.meetup.com/oauth2/authorize',
  redirectUri: 'https://meetup-discord-bot.herokuapp.com/auth/callback',
  scopes: [],
});

export const auth = (_request: Request, response: Response) => {
  logger.info(meetupAuth.code.getUri());
  response.redirect(meetupAuth.code.getUri());
};

export const authCallback = (request: Request, response: Response) => {
  logger.info(request.originalUrl);
  meetupAuth.code
    .getToken(request.originalUrl)
    .then((user) => {
      logger.info(user);
      user
        .refresh()
        .then((updatedUser) => {
          logger.info(updatedUser !== user);
          logger.info(updatedUser.accessToken);
        })
        .catch(() => {});

      // We should store the token into a database.
      return response.send(user.accessToken);
    })
    .catch((error) => {
      logger.error(error);
    });
};

export const ok = (_request: Request, response: Response) => {
  response.sendStatus(200);
};
