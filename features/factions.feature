Feature: Factions

  Rules:
  - Characters may belong to one or more Factions.
    - Newly created Characters belong to no Faction.
    - A Character may Join or Leave one or more Factions.
  - Players belonging to the same Faction are considered Allies
  - Allies can Heal one another.

Background: Characters exist
  Given the following characters exist:
    | name  | 
    | Bill  | 
    | Ben   | 
    | Max   | 
    | Paddy | 
  And the characters are at location:
   | name  | x | y  |
   | Bill  | 0 | 0  |
   | Ben   | 0 | 2  |
   | Max   | 0 | 20 |
   | Paddy | 0 | 50 |

Scenario: Characters start with no faction
  Then Bill should belong to no faction

Scenario: Join a faction
  When Bill joins faction "Foo"
  Then Bill should belong to 1 faction

Scenario: Join many factions
  When Bill joins Factions
    | faction |
    | Foo     |
    | Bar     |
  Then Bill should belong to 2 factions

Scenario: Leave a faction
  Given Bill is a member of faction "Foo"
  When Bill leaves faction "Foo"
  Then Bill should belong to 0 factions

Scenario: Leave a faction not a member of
  When Bill leaves faction "non existant"
  Then Bill should belong to 0 factions

Scenario: Bill and Ben are allies
  Given Bill is a member of faction "Foo"
  When Ben joins faction "Foo"
  Then Bill and Ben should be allies

Scenario: Bill attacks his ally
  Given Bill and Ben are allies
  When Ben attacks Bill with 20 damage
  Then Bill's health should be 1000

Scenario: Heal an ally
  Given Bill and Ben are allies
  But Bill has 10 health
  When Ben heals Bill 10
  Then Bill's health should be 20

Scenario: Cannot heal an enemy
  Given Bill and Ben are enemies
  But Bill has 10 health
  When Ben heals Bill 10
  Then Bill's health should be 10
  