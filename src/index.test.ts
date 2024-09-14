import { describe, test } from "vitest";
import { assert } from "riteway/vitest";

describe('Dreamscape Sleep - sample test', () => {
  test("Tests should run", () => {
    assert({
      given: 'a test',
      should: 'run',
      actual: true,
      expected: true
    });
  });
});
