-- Clear Database
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS guild_members CASCADE;
DROP TABLE IF EXISTS guild_info CASCADE;
DROP TABLE IF EXISTS timeline_permission CASCADE;
DROP TABLE IF EXISTS timeline CASCADE;
DROP TABLE IF EXISTS timeline_assignment_objects CASCADE;
DROP TABLE IF EXISTS github_info CASCADE;
DROP TABLE IF EXISTS github_personal_access_tokens CASCADE;
DROP TABLE IF EXISTS github_ouath_token CASCADE;



-- Initialize tables
CREATE TABLE "github_info" (
  "github_username" VARCHAR (64),
  PRIMARY KEY ("github_username")
);

CREATE TABLE "accounts" (
  "discord_id" VARCHAR (64),
  "github_username" VARCHAR (64),
  "discord_username" VARCHAR (64) UNIQUE NOT NULL,
  "discord_email" VARCHAR (64) UNIQUE NOT NULL,
  "website_key" VARCHAR (512) ,
  PRIMARY KEY ("discord_id"),
  CONSTRAINT "FK_accounts.github_username"
    FOREIGN KEY ("github_username")
      REFERENCES "github_info"("github_username")
);

CREATE TABLE "github_personal_access_tokens" (
  "github_username" VARCHAR (64),
  "personal_access_token" VARCHAR (256),
  "pat_token_expiration_date" TIMESTAMP NOT NULL,
  CONSTRAINT "FK_github_personal_access_tokens.github_username"
    FOREIGN KEY ("github_username")
      REFERENCES "github_info"("github_username")
);

CREATE TABLE "github_ouath_token" (
  "github_username" VARCHAR (64),
  "oauth_token" VARCHAR (256),
  CONSTRAINT "FK_github_ouath_token.github_username"
    FOREIGN KEY ("github_username")
      REFERENCES "github_info"("github_username")
);

CREATE TABLE "guild_info" (
  "guild_id" VARCHAR(64),
  PRIMARY KEY ("guild_id")
);

CREATE TABLE "timeline" (
  "id" SERIAL,
  "guild_id" VARCHAR (64),
  "premium_version" BOOLEAN,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_timeline.guild_id"
    FOREIGN KEY ("guild_id")
      REFERENCES "guild_info"("guild_id")
);

CREATE TABLE "timeline_permission" (
  "discord_id" VARCHAR (64),
  "timeline_id" SERIAL,
  "owner" BOOLEAN,
  "editor" BOOLEAN,
  "worker" BOOLEAN,
  CONSTRAINT "FK_timeline_permission.discord_id"
    FOREIGN KEY ("discord_id")
      REFERENCES "accounts"("discord_id"),
  CONSTRAINT "FK_timeline_permission.timeline_id"
    FOREIGN KEY ("timeline_id")
      REFERENCES "timeline"("id")
);

CREATE TABLE "timeline_assignment_objects" (
  "timeline_id" INTEGER,
  "discord_id" VARCHAR (64),
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP,
  "assignment_title" VARCHAR(256),
  "assignment_description" VARCHAR(2048),
  "status" VARCHAR(256),
  CONSTRAINT "FK_timeline_assignment_objects.timeline_id"
    FOREIGN KEY ("timeline_id")
      REFERENCES "timeline"("id"),
  CONSTRAINT "FK_timeline_assignment_objects.discord_id"
    FOREIGN KEY ("discord_id")
      REFERENCES "accounts"("discord_id")
);

CREATE TABLE "guild_members" (
  "guild_id" VARCHAR(64),
  "discord_id" VARCHAR(64),
  CONSTRAINT "FK_guild_members.guild_id"
    FOREIGN KEY ("guild_id")
      REFERENCES "guild_info"("guild_id"),
  CONSTRAINT "FK_guild_members.discord_id"
    FOREIGN KEY ("discord_id")
      REFERENCES "accounts"("discord_id")
);



-- Initialize default values
INSERT INTO github_info (github_username)
VALUES ('dogunbound');
INSERT INTO github_info (github_username)
VALUES ('NoahGori');

INSERT INTO accounts (discord_id, github_username, discord_username, discord_email, website_key)
VALUES ('207922540163760130', 'dogunbound', 'dogUnbound#8593', 'dogunbound5@gmail.com', '1');
INSERT INTO accounts (discord_id, github_username, discord_username, discord_email, website_key)
VALUES ('222915151429369857', 'NoahGori', 'NoahG', 'Test@gmail.com', '2');

INSERT INTO guild_info (guild_id)
VALUES ('898251356920500264');

INSERT INTO guild_members (guild_id, discord_id)
VALUES ('898251356920500264', '207922540163760130');
INSERT INTO guild_members (guild_id, discord_id)
VALUES ('898251356920500264', '222915151429369857');

INSERT INTO timeline (guild_id, premium_version)
VALUES ('898251356920500264', true);

INSERT INTO timeline_permission (discord_id, timeline_id, owner, editor, worker)
VALUES ('207922540163760130', 1, true, true, false);
INSERT INTO timeline_permission (discord_id, timeline_id, owner, editor, worker)
VALUES ('222915151429369857', 1, false, false, true);

INSERT INTO guild_info (guild_id) 
VALUES ('916113056700968991');

INSERT INTO guild_members (guild_id, discord_id) 
VALUES ('916113056700968991', '207922540163760130');

INSERT INTO timeline (guild_id, premium_version)
VALUES ('916113056700968991', true);

INSERT INTO timeline_permission (discord_id, timeline_id, owner, editor, worker)
VALUES ('207922540163760130', '2', true, true, false);
INSERT INTO timeline_permission (discord_id, timeline_id, owner, editor, worker)
VALUES ('222915151429369857', '2', true, true, false);

INSERT INTO timeline_assignment_objects (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status)
VALUES ('2', '222915151429369857', NOW(), NOW(), 'test2.1', 'WHy is it not working', 'incomplete');
INSERT INTO timeline_assignment_objects (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status)
VALUES ('2', '222915151429369857', NOW(), NOW(), 'test2.2', 'test', 'incomplete');
INSERT INTO timeline_assignment_objects (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status)
VALUES ('2', '222915151429369857', NOW(), NOW(), 'test2.3', 'test', 'incomplete');
