## GET players/10/games

```
{"id":39,"computer_move":"2","player_move":"1","game_score":1,"player_id":10,"created_at":"2018-12-27T19:58:30.413Z","updated_at":"2018-12-27T19:58:30.413Z"},

{"id":40,"computer_move":"2","player_move":"1","game_score":1,"player_id":10,"created_at":"2018-12-27T19:58:30.416Z","updated_at":"2018-12-27T19:58:30.416Z"},
```
`id` is the game id

`computer_move` is what the computer played:
* 1 == Rock
* 2 == Paper
* 3 == Scissors

`player_move` is what the player played:
* 1 == Rock
* 2 == Paper
* 3 == Scissors

`game_score` is the result of the game
* 1 == Player Won
* 0 == Computer Won
