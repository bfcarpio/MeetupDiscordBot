import { CreateChannel } from './createChannel';
import { DeleteChannel } from './deleteChannel';
import { MeetupGetBadgesCommands } from './meetup/getBadges';
import { MeetupGetEventStatsCommands } from './meetup/getEventStats';
import { MeetupGetUserRolesCommands } from './meetup/getUserRoles';
import { MeetupSelfOnboardCommands } from './meetup/selfOnboard';
import { OnboardUserCommands } from './onboardUser';

const Commands = [
  MeetupSelfOnboardCommands,
  MeetupGetBadgesCommands,
  MeetupGetEventStatsCommands,
  MeetupGetUserRolesCommands,
  OnboardUserCommands,
  CreateChannel,
  DeleteChannel,
];

export default Commands;
