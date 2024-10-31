import { sql } from 'drizzle-orm';
import { customType } from 'drizzle-orm/sqlite-core';

export const vectorColumn = customType<{
  data: number[];
  config: { length: number };
  configRequired: true;
  driverData: Buffer;
}>({
  dataType(config) {
    const length = config?.length ?? 768;
    return `F32_BLOB(${length})`;
  },
  fromDriver(value) {
    return Array.from(new Float32Array(value.buffer));
  },
  toDriver(value) {
    return sql`vector(${JSON.stringify(value)})`;
  },
});
