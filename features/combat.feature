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

Scenario: Create a character
  When I create a character
  Then the characters health should be 1000
  And the characters level should be 1
  And the character should be alive

Scenario: Attack a character
  Given characters Bill, Ben have been created
  When Bill attacks Ben with 5 damage
  Then Ben's health should be 995

Scenario: Kill a character
  Given characters Bill, Ben have been created
  But Ben has 10 health
  When Bill attacks Ben with 20 damage
  Then Ben's health should be 0
  And Ben should be dead

Scenario: Attempt resurrection
  Given characters Bill, Ben have been created
  But Ben has died
  When Bill heals Ben 5
  Then Ben should be dead
  And Ben's health should be 0