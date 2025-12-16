import { z } from 'zod';

export const ParsedNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
});

export type ParsedName = z.infer<typeof ParsedNameSchema>;

// Pre-compiled regex patterns for performance
const WHITESPACE_REGEX = /\s+/;
const USERNAME_CHARS_REGEX = /\d|[_\-@.]/u;

/**
 * Intelligently parses a name string into firstName and lastName components.
 *
 * Handles various cases:
 * - Full names: "Filip Ljubić" -> { firstName: "Filip", lastName: "Ljubić" }
 * - Multiple names: "Ana Maria Petrovic" -> { firstName: "Ana", lastName: "Maria Petrovic" }
 * - Single names/usernames: "john123" -> { firstName: "john123", lastName: undefined }
 * - Empty/invalid: "" -> { firstName: "User", lastName: undefined }
 *
 * @param name The name string from authentication provider
 * @returns ParsedName object with firstName (required) and lastName (optional)
 */
export const parseName = (name: string | null | undefined): ParsedName => {
  // Handle null/undefined/empty cases
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { firstName: 'User', lastName: undefined };
  }

  const trimmed = name.trim();

  // Split by whitespace and filter out empty parts
  const parts = trimmed
    .split(WHITESPACE_REGEX)
    .filter((part) => part.length > 0);

  if (parts.length === 0) {
    return { firstName: 'User', lastName: undefined };
  }

  if (parts.length === 1) {
    // Single name - could be first name or username
    const singleName = parts[0];
    if (!singleName) {
      return { firstName: 'User', lastName: undefined };
    }
    return { firstName: singleName, lastName: undefined };
  }

  // Multiple parts - first is firstName, rest combined as lastName
  const [firstName, ...lastNameParts] = parts;
  const lastName = lastNameParts.join(' ');

  if (!firstName) {
    return { firstName: 'User', lastName: undefined };
  }

  return {
    firstName,
    lastName: lastName.length > 0 ? lastName : undefined,
  };
};

/**
 * Checks if a name string looks like a real name vs a username
 * This can be useful for UI decisions or validation
 *
 * @param name The name string to analyze
 * @returns true if it looks like a real name, false if it looks like a username
 */
export const looksLikeRealName = (name: string | null | undefined): boolean => {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  const parts = trimmed
    .split(WHITESPACE_REGEX)
    .filter((part) => part.length > 0);

  // Single word - check if it looks username-ish
  if (parts.length === 1) {
    const word = parts[0];
    if (!word) {
      return false;
    }

    // Contains numbers or special characters -> likely username
    if (USERNAME_CHARS_REGEX.test(word)) {
      return false;
    }

    // All lowercase or all uppercase -> likely username
    if (word === word.toLowerCase() || word === word.toUpperCase()) {
      return false;
    }

    // Very short (2 chars or less) -> likely username/initials
    if (word.length <= 2) {
      return false;
    }

    return true;
  }

  // Multiple words usually indicate real names
  return parts.length >= 2;
};
