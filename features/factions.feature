Feature: Factions

  Rules:
  - Characters may belong to one or more Factions.
    - Newly created Characters belong to no Faction.
    - A Character may Join or Leave one or more Factions.

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

Scenario: Join many factions
  When Bill joins Factions
    | faction |
    | Foo     |
    | Bar     |
  Then Bill should belong to 2 factions