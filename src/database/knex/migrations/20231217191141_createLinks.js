export async function up(knex) {
  await knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.text("url").notNullable();

    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable("links");
}
