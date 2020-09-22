Feature: Combat

  Rules:
    - Characters start at health 1000

Scenario: Create a character
  When I create a character
  Then the characters health should be 1000
  And the characters level should be 1
  And the character should be alive
