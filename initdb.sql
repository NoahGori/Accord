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

INSERT INTO accounts (discord_id, github_username, discord_username, discord_email, website_key)
VALUES ('207922540163760130', 'dogunbound', 'dogUnbound#8593', 'dogunbound5@gmail.com', '1');

INSERT INTO guild_info (guild_id)
VALUES ('898251356920500264');

INSERT INTO guild_members (guild_id, discord_id)
VALUES ('898251356920500264', '207922540163760130');

INSERT INTO timeline (guild_id, premium_version)
VALUES ('898251356920500264', true);
