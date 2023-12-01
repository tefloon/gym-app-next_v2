-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,
    CONSTRAINT "Workout_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "personalBest" REAL
);

-- CreateTable
CREATE TABLE "ExerciseSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "workoutId" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "ExerciseSession_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseSession_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExerciseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "wasCompleted" BOOLEAN NOT NULL DEFAULT false,
    "weight" REAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "ExerciseSet_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ExerciseSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
