CREATE TABLE `embeddings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text DEFAULT '43227010' NOT NULL,
	`resource_id` text,
	`content` text NOT NULL,
	`embedding` F32_BLOB(1024),
	FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text DEFAULT '43227010' NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
