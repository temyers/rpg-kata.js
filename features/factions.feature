Feature: Factions

  Rules:
  - Characters may belong to one or more Factions.
    - Newly created Characters belong to no Faction.

Background: Characters exist
  Given the following characters exist:
    | name  | 
    | Bill  | 
    | Ben   | 
    | Max   | 
    | Paddy | 

Scenario: Characters start with no faction
  Then Bill should belong to no faction

Scenario: Join a faction
  When Bill joins faction "Foo"
  Then Bill should belong to 1 faction