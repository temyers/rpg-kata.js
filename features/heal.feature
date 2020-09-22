Feature: Heal

  Rules:
    - A Character can Heal a Character.
      - Dead characters cannot be healed
      - Healing cannot raise health above 1000
      - A Character can only Heal itself.

Background: Characters exist
  Given the following characters exist:
    | name  | class  |
    | Bill  | melee  |
    | Ben   | melee  |

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
