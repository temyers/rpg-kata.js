Feature: Combat

  Rules:
    - Characters have an attack Max Range.
      - *Melee* fighters have a range of 2 meters.
      - *Ranged* fighters have a range of 20 meters.
      - Characters must be in range to deal damage to a target.

Background: Characters exist
  Given the following characters exist:
    | name  | class  |
    | Bill  | melee  |
    | Ben   | melee  |
    | Max   | ranged |
    | Paddy | ranged |
  And the characters are at location:
   | name  | x | y  |
   | Bill  | 0 | 0  |
   | Ben   | 0 | 2  |
   | Max   | 0 | 20 |
   | Paddy | 0 | 50 |

Scenario Outline: Attack a character in range <class>
  When <subject> attacks <target> with 5 damage
  Then <targets> health should be 995

  Examples:
  | subject | target | targets | class  |
  | Bill    | Ben    | Ben's   | melee  |
  | Max     | Bill   | Bill's  | ranged |

Scenario Outline: Cannot attack character too far away - <why>
  When <subject> attacks <target> with 20 damage
  Then <target>'s health should be 1000

  Examples:
  | subject | target | why    |
  | Bill    | Max    | melee  |
  | Max     | Paddy  | ranged |