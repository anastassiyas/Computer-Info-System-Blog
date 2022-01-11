<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Мини-тест</title>
    <style>
        form {
            display: none;
        }
    </style>
</head>
<body>
<form action="#" id="questionForm">
    <div>Время на этот вопрос: <span id="downcount"></span></div>
    <p id="question"></p>
    <input id="YesBtn" type="button" value="Да">
    <input id="NoBtn" type="button" value="Нет">
</form>
<script>
    var questionsArray=[
        ['Вопрос 1', 'Да'],
        ['Вопрос 2', 'Да'],
        ['Вопрос 3', 'Да'],
        ['Вопрос 4', 'Да'],
        ['Вопрос 5', 'Нет']
    ]; //Вопросы и правильные ответы в виде 'Да' или 'Нет'
    var userName=prompt('Введите ваше имя');
    alert('Тест состоит из 5 вопросов, на каждый дается 15 секунд. Нажмите ОК, чтобы начать тест');
    var startTime,                       //время начала теста
        time,                            //оставшееся время на вопрос
        timer,  
        frm=document.getElementById('questionForm'), //форма вопроса
        questionNumber,                  //номер текущего вопроса
        answerArray=[];                  //массив введенных пользователем ответов
    
    function showResults() {
        var rightAnswers=0,                 //количество правильных ответов
            endTime= new Date,              //время окончания теста
            totalTime=endTime-startTime;    //время, затраченное на прохождение теста (в миллисекундах)
        for(var i=0; i<5; i++) {
            if (answerArray[i]==questionsArray[i][1]) rightAnswers++;
        }
        var mark= rightAnswers<3 ? 2 : rightAnswers; //оценка
        alert(userName+', вы сдали тест на '+mark+' за время '+
            Math.floor(totalTime/1000/60)+'мин. '+Math.round(totalTime/1000%60)+'сек.');
    }
    function closeQuestion(answer) {    
        frm.style.display='none';
        clearInterval(timer);
        answerArray[questionNumber]=answer;
        if(questionNumber==4) {
            showResults();
        } else {
            questionNumber++;
            showQuestion(questionNumber);
        }
    }
    function setTime() {
        var downcountElement=document.getElementById('downcount'); //
        downcountElement.innerHTML=time;
        if(time<=0) {
            closeQuestion('Время вышло');
            return;
        };
        time--;
    }
    function showQuestion(questionNumber) {
        var question=document.getElementById('question');
        question.innerHTML=questionsArray[questionNumber][0];
        time=15;
        setTime();
        timer=setInterval(setTime, 1000);
        frm.style.display='block';
    }
    
    document.getElementById('YesBtn').onclick=function() {
        closeQuestion('Да');
    };
    document.getElementById('NoBtn').onclick=function() {
        closeQuestion('Нет');
    };
    
    startTime= new Date;
    questionNumber=0;
    showQuestion(questionNumber);
</script>
 
</body>
</html>