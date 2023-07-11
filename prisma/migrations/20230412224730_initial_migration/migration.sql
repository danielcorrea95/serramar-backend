-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "role_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "city_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_user" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cups" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "sub_domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cup_config" (
    "id" TEXT NOT NULL,
    "cup_id" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "amount_players" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "regulation" TEXT NOT NULL,

    CONSTRAINT "cup_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_types" (
    "id" TEXT NOT NULL,
    "cup_config_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "cup_config_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount_teams" INTEGER NOT NULL,
    "amount_groups" INTEGER NOT NULL,
    "amount_next_phase" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "foundation_date" DATE,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "city_id" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_user" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_team" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "date_birth" DATE,
    "document" TEXT NOT NULL,
    "phone" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_player_team" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "avatar" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_player_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT NOT NULL,
    "cup_config_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "team_a" TEXT NOT NULL,
    "team_b" TEXT NOT NULL,
    "cupId" TEXT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_details" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "game_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "time" TIME(6) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "card_type_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "time" TIME(6) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cups_sub_domain_key" ON "cups"("sub_domain");

-- CreateIndex
CREATE UNIQUE INDEX "players_document_key" ON "players"("document");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_user" ADD CONSTRAINT "company_user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_user" ADD CONSTRAINT "company_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cups" ADD CONSTRAINT "cups_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cup_config" ADD CONSTRAINT "cup_config_cup_id_fkey" FOREIGN KEY ("cup_id") REFERENCES "cups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_types" ADD CONSTRAINT "card_types_cup_config_id_fkey" FOREIGN KEY ("cup_config_id") REFERENCES "cup_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_cup_config_id_fkey" FOREIGN KEY ("cup_config_id") REFERENCES "cup_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_user" ADD CONSTRAINT "team_user_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_user" ADD CONSTRAINT "team_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_team" ADD CONSTRAINT "group_team_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_team" ADD CONSTRAINT "group_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_player_team" ADD CONSTRAINT "category_player_team_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_player_team" ADD CONSTRAINT "category_player_team_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_player_team" ADD CONSTRAINT "category_player_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_cup_config_id_fkey" FOREIGN KEY ("cup_config_id") REFERENCES "cup_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_cupId_fkey" FOREIGN KEY ("cupId") REFERENCES "cups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_details" ADD CONSTRAINT "game_details_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_details" ADD CONSTRAINT "game_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_card_type_id_fkey" FOREIGN KEY ("card_type_id") REFERENCES "card_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
