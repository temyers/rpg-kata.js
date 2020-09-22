Feature: Combat

  Rules:
    - Characters start with:
        health 1000
        level 1
        is alive
    - Characters can Deal Damage to Characters.
      - Damage is subtracted from Health
      - When damage received exceeds current Health, Health becomes 0 and the character dies
    - A Character can Heal a Character.
      - Dead characters cannot be healed
      - Healing cannot raise health above 1000
    - A Character cannot Deal Damage to itself.

Background: Characters exist
  Given characters Bill, Ben have been created

Scenario: Create a character
  # When I create a character
  Then Bill's health should be 1000
  And Bill's level should be 1
  And Bill should be alive

Scenario: Attack a character
  When Bill attacks Ben with 5 damage
  Then Ben's health should be 995

Scenario: Kill a character
  But Ben has 10 health
  When Bill attacks Ben with 20 damage
  Then Ben's health should be 0
  And Ben should be dead

Scenario: Attempt resurrection
  But Ben has died
  When Bill heals Ben 5
  Then Ben should be dead
  And Ben's health should be 0

Scenario: Heal a character
  But Ben has 10 health
  When Bill heals Ben 10
  Then Ben should be alive
  And Ben's health should be 20

Scenario: Heal character to full health
  But Ben has 990 health
  When Bill heals Ben 50
  Then Ben should be alive
  And Ben's health should be 1000

Scenario: Self harm
  When Bill attacks Bill with 5 damage
  Then Bill's health should be 1000