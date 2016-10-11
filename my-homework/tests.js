import assert from 'assert'
import { Player } from './player'
import { Game } from './game'
import { Bomb } from './bomb'
import { Place } from './place'
// # Домашнее задание
//
// * Выбрать предметную область
// * Написать тесты на предложенные сценарии
// * Добавить свои собственные сценарии и написать тесты
// * Выбрать 5-10 тестов и предложить несколько вариантов их именования, выбрать лучшее и объяснить, почему это имя лучше других
//
// ## Игра Counter Strike
// * Террорист закладывает бомбу
// * Если бомба не обезврежена, происходит взрыв террористы выигрывают
// * Если бомбу успевают обезвредить, выигрывает спецназ
// * Бомбу можно закладывать только 1 раз за в раунде
// * Для того, чтобы выиграть игру, нужно выиграть 2 раунда

//arrange act assert

//<Assert>.<Arrange>
// * Террорист закладывает бомбу
suite('The bomb can be planted', function() {
        test('by Terrorists', function() {
            let player = new Player({roles:["Terrorist"]});
            let bomb = new Bomb();

            let bombPlanted = player.plantBomb(bomb);

            assert.equal(true, bombPlanted);
        });
    // Террорист может заложить бомбу, если он живой
        test('by alive Terrorists', function() {
            let player = new Player({roles:["Terrorist"], isAlive: true});
            let deadTerrorist = new Player({roles:["Terrorist"], isAlive: false});
            let bomb = new Bomb();

            let bombPlanted = player.plantBomb(bomb);
            let bombPlantedByDead = deadTerrorist.plantBomb(bomb);

            assert.equal(true, bombPlanted);
            assert.equal(false, bombPlantedByDead);
        })
    });
//<ClassName>Should.<Assert>_<Arrange>
// * Для того, чтобы выиграть игру, нужно выиграть 2 раунда
suite('Game should', function() {
    suite('be ended', function() {
        test('if there are 2 wins', function() {
            let game = new Game();
            let winsCount = 2;

            let gameIsOver = game.isOver(winsCount);

            assert.equal(true, gameIsOver);
        })
    });
    // Игра должна продолжаться, если нет двух побед
    suite('be continued', function() {
        test('if there are less then 2 wins', function() {
            let game = new Game();
            let winsCount = 1;
            let zeroWinsCount = 0;

            let gameIsOver = game.isOver(winsCount);
            let gameIsOverIfNoWins = game.isOver(zeroWinsCount);

            assert.equal(false, gameIsOver);
            assert.equal(false, gameIsOverIfNoWins);
        })
    })
});
//<ClassNameTests>.<Act>_<Arrange>_<Assert>
// * Если бомбу успевают обезвредить, выигрывает спецназ
suite('Bomb defused', function() {
    suite('then Special Forces', function() {
        test('win', function() {
            let bomb = new Bomb();
            let player = new Player({roles:["Special Force"]});

            bomb.defuse();
            let playerWon = player.isWinner(bomb.isDefused);

            assert.equal(true, playerWon);
        })
    });
    // если бомбу успевают обезвредить, то террористы проигрывают
    suite('then Terrorists', function() {
        test('lose', function() {
            let bomb = new Bomb();
            let player = new Player({roles:["Terrorist"]});

            bomb.defuse();
            let playerWon = player.isWinner(bomb.isDefused);

            assert.equal(false, playerWon);
        })
    })
});
//When<Action>.<Arrange><Assert>
// * Если бомба не обезврежена, происходит взрыв террористы выигрывают
suite('When bomb is not defused', function() {
    suite('then Terrorists', function() {
        test('win', function() {
            let bomb = new Bomb();
            let player = new Player({roles:["Terrorist"]});

            let playerWon = player.isWinner(bomb.isDefused);

            assert.equal(true, playerWon);
        })
    });
    //если бомба не обезврежена то спецназ проигрывает
    suite('then Special Forces', function() {
        test('lose', function() {
            let bomb = new Bomb();
            let player = new Player({roles:["Special Force"]});

            let playerWon = player.isWinner(bomb.isDefused);

            assert.equal(false, playerWon);
        })
    });
});
//<Arrange>.<Assert>
// * Бомбу можно закладывать только 1 раз за в раунде
suite('In the round a bomb can be planted', function() {
    test('only 1 time', function() {
        let bomb = new Bomb();

        let bombPlanted = bomb.plant();
        let bombPlantedAgain = bomb.plant();

        assert.equal(true, bombPlanted);
        assert.equal(false, bombPlantedAgain);
    });
    // Бомбу можно заложить только в определённом месте
    test('only in specific place', function() {
        let bomb = new Bomb();
        let player = new Player({roles:["Terrorist"], coordinates:{x:45,y:32}});
        let place = new Place({isForPlant: true, location: {x:3,y:15,width:100,height:100}});

        let bombPlanted = player.plantBomb(bomb, place);

        assert.equal(true, bombPlanted);
    })
});