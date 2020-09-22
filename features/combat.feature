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
      - A Character can only Heal itself.
    - A Character cannot Deal Damage to itself.
    - When dealing damage:
      - If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
      - If the target is 5 or more levels below the attacker, Damage is increased by 50%
    - Characters have an attack Max Range.
      - *Melee* fighters have a range of 2 meters.



Background: Characters exist
  Given characters Bill, Ben, Max, Paddy have been created
  And the characters are at location:
   | name  | x | y  |
   | Bill  | 0 | 0  |
   | Ben   | 0 | 2  |
   | Max   | 0 | 20 |
   | Paddy | 0 | 50 |
  

Scenario: Create a character
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
  When Ben heals themself 5
  Then Ben should be dead
  And Ben's health should be 0

Scenario: Heal self
  But Bill has 10 health
  When Bill heals themself 10
  Then Bill should be alive
  And Bill's health should be 20

Scenario: Heal to full health
  But Ben has 990 health
  When Ben heals themself 50
  Then Ben should be alive
  And Ben's health should be 1000

Scenario: Self harm
  When Bill attacks Bill with 5 damage
  Then Bill's health should be 1000

Scenario: Attack stronger level character
  Given Ben is level 6
  When Bill attacks Ben with 20 damage
  Then Ben's health should be 990

Scenario: Attack weaker level character
  Given Ben is level 6
  When Ben attacks Bill with 20 damage
  Then Bill's health should be 970