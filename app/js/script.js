//////////////TEST#1///////////
var Body = document.body; //определяем body в переменную
var ElementScript; // переменная для елемента script
var Time = {
        // ьетод инициализации, вставляет все необходимые элементы и вешает события
        init: function () {
                //Добавляет класс в общий контейнер
                this.BlockForTest_1.classList.add("TEST#1");
                //Задаем название кнопки
                this.ButtonShowDate.innerHTML = "GET TIME";
                //Добавляем стили чтобы кнопку никто не обтекал
                this.ButtonShowDate.style.clear = "both";
                this.ButtonShowDate.style.display = "block";
                //вставляем в select параметры для выбора формата времени
                this.ElemGetFormat.innerHTML = "<option value='0'>dd.MM.yyyy HH:mm:ss</option><option value='1'>yyyy-MM-dd HH:mm</option><option value='2'>yyyy/MM/dd HH:mm:ss</option>";
                //вставляем в select параметры для выбора временной зоны
                this.ElemGetTimeZone.innerHTML = "<option value='-6'>(-06:00) Центральное время (США и Канада), Мехико</option><option value='3'>(+03:00) Минск, Багдад, Москва, Санкт-Петербург, Волгоград</option><option value='6'>(+06:00) Астана, Дакка,Омск</option><option value='11.5'>(+11:30) Остров Норфолк (Австралия)</option>";
                //задаем различные стили
                this.BlockForTest_1.style.margin = "30px";
                this.ElemShowDate.style.width = "300px";
                this.ElemShowDate.style.height = "30px";
                this.ElemShowDate.style.border = "solid 1px black";
                //добавляем все необходимые елементы в контейнер
                this.BlockForTest_1.appendChild(this.Label);
                this.BlockForTest_1.appendChild(this.ButtonShowDate);
                this.BlockForTest_1.appendChild(this.ElemGetFormat);
                this.BlockForTest_1.appendChild(this.ElemGetTimeZone);
                this.BlockForTest_1.appendChild(this.ElemShowDate);
                //Добавляем контейнер с первым заданием в Body
                Body.appendChild(this.BlockForTest_1);
                //вешаем событие на кнопку
                this.ButtonShowDate.addEventListener('mousedown', function () {
                    //при событии mousedown запускаем метод addScript объекта Time и передаем ему URL для запросса
                    Time.addScript('http://date.jsontest.com?callback=Time.getdata')
                        /*
                        Есть возможность реализации через объект XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', 'http://date.jsontest.com?callback=Time.getdata', false);
                            xhr.send();
                            if (xhr.status != 200) {
                                обработать ошибку
                                alert(xhr.status + ': ' + xhr.statusText);
                            }
                            else {
                                alert(xhr.responseText);
                            }
                        */
                }, false);
            }
            //Создаем текстовой елемент с порядковым название задания

        ,
        Label: document.createTextNode("TEST#1")
            //Создаем контейнер для данного задания

        ,
        BlockForTest_1: document.createElement('div')
            //Создаем кнопку

        ,
        ButtonShowDate: document.createElement('button')
            //Создаем елемент выбора для формата даты

        ,
        ElemGetFormat: document.createElement('select')
            //Создаем елемент выбора для временной зоны

        ,
        ElemGetTimeZone: document.createElement('select')
            //Создаем блок куда выводится резутьтат запроса

        ,
        ElemShowDate: document.createElement('div')
            //Метод для запроса JSON, принимает в себя URL

        ,
        addScript: function (src) {
                //проверяем не был ли до этого создан такой елемент( чтобы не множится )
                if (ElementScript) {
                    //если есть то удаляем его
                    ElementScript.parentNode.removeChild(ElementScript);
                }
                //создаем елемент Script
                ElementScript = document.createElement("script");
                //добавляем ему атрибут src равный переданному в метод URL
                ElementScript.src = src;
                //добавляем его в head , так как используем JSONP, то при добавлении скрипта он автоматически быдет выполнен и так как мы передаем в url ?callback=Time.getdata следовательно сработает метод объета Time getdata
                document.head.appendChild(ElementScript);
            }
            //метод для добавления 0 в начало числа если оно однозначное

        ,
        two: function (num) {
                return ("0" + num).slice(-2);
            }
            //метод для форматирования даты в зависсимости от входных параметров (param - какой формат, time - время в миллисекундах)

        ,
        format: function (param, time) {
                //преобразуем в формат Date
                var date = new Date(time); //получаем день        
                var Month = this.two(date.getMonth() + 1); //получаем месяц, +1 потому что месяца отдаются от 0 до 11        
                var Day = this.two(date.getDate()); //получаем день
                var Year = date.getFullYear(); //получаем год
                var Hours = this.two(date.getHours()); //получаем час
                var Minutes = this.two(date.getMinutes()); //получаем минуты
                var Seconds = this.two(date.getSeconds()); //получаем секунды        
                var time_now = null; //объявляем переменныю в которую положим резутьтат
                //в зависимости от входного параметра param собираем даты в том формате в котором нам нужно и возвращаем её
                if (param == 0) {
                    time_now = Month + "." + Day + "." + Year + "  " + Hours + ":" + Minutes + ":" + Seconds;
                    return time_now;
                }
                if (param == 1) {
                    time_now = Year + "-" + Month + "-" + Day + "  " + Hours + ":" + Minutes;
                    return time_now;
                }
                if (param == 2) {
                    time_now = Year + "/" + Month + "/" + Day + "  " + Hours + ":" + Minutes + ":" + Seconds;
                    return time_now;
                }
            }
            //метод который передается в запросе JSONP параметром callback (?callback=Time.getdata) а атрибут val попадает ответ с сервера

        ,
        getdata: function (val) {
            //получаем миллисекунды преобразовываем их в число
            var milliseconds = parseInt(val.milliseconds_since_epoch);
            //получам сдвиг временной зоны в полученной дате
            var timeZoneChane = new Date(milliseconds).getTimezoneOffset() * 60 * 1000;
            //получаем сдвиг временной зоны который нам нужно и преобразовываем его в миллисекунды
            var timeZone = parseFloat(this.ElemGetTimeZone.value) * 60 * 60 * 1000;
            //преобразовываем полученную дату и добавляем ей тот временной сдвиг который нам нужно получить
            var timeGood = milliseconds + timeZoneChane + timeZone;
            //получаем намер формата в котором хотим отобразить нашу дату
            var param_format = parseInt(this.ElemGetFormat.value);
            //передаем все параметры в метод Time.format и он возврвщает отформатированную дату в переменную date_now
            date_now = this.format(param_format, timeGood);
            //выводит результат
            this.ElemShowDate.innerHTML = date_now;
        }
    }
    //////////////TEST#2///////////
var Bits = { //объект для задания №2
        arrayNumbers: [] // выделяем массив в котором будут храниться рандомные числа

        ,
        Label: document.createTextNode("TEST#2") //создаем текстовой елемент с названием задания

        ,
        BlockForTest_2: document.createElement('div') //создаем контейнер для всех блоков данного задания

        ,
        ButtonsBits: document.createElement('div') // блок в котором будут все кнопки с битами

        ,
        ElemShowArray: document.createElement('select') //блок для вывода результата сорировки

        ,
        init: function () { // метод который создает все елементы для данного задания
            //наполняем массив 50-ю рандомными числами
            for (var i = 0; i < 50; i++) {
                //метод random возвращает рандомное число от 0 до 65635
                var num = this.random(0, 65535);
                //кладём его в массив
                this.arrayNumbers.push(num);
                //выводим полученное число на данной итерации в сеоект с результатом
                this.ElemShowArray.innerHTML += "<option>" + num + "</option>";
            }
            //кладу ещё 0 и 65535 для проверки
            this.arrayNumbers.push(65535);
            this.arrayNumbers.push(0);
            for (var i = 0; i < 16; i++) { //создаем 16 кнопак для кажого бита
                var button = document.createElement('button'); // создаем элемент button
                button.style.backgroundColor = "gray"; //добавляем кнопке серый цвет
                button.innerHTML = "0"; // вставляем в кнопку 0
                this.ButtonsBits.appendChild(button); //добавляем кнопку на каждой итерации в контейнер для кнопок
            }
            this.ElemShowArray.setAttribute('multiple', ''); //добавляем блоку с результатам атрибут multiple
            this.BlockForTest_2.classList.add("TEST#2"); //для наглядности задаем класс контейнеру данного задания
            //раздаем различные стили
            this.BlockForTest_2.style.margin = "30px";
            this.ElemShowArray.style.width = "300px";
            this.ElemShowArray.style.height = "100px";
            this.ButtonsBits.style.margin = "15px 0";
            this.BlockForTest_2.appendChild(this.Label); //Кладём в контейнер название звдания
            this.BlockForTest_2.appendChild(this.ButtonsBits); //кладём в контейнер блок со всеми 16=ю кнопками
            this.BlockForTest_2.appendChild(this.ElemShowArray); //кладем в контейнер блок для вывода результата
            Body.appendChild(this.BlockForTest_2); //добавляем контейнер в Body
            //вешаем событие mousedown на блок в котором лежат все кнопки и делегируем событие ( определяем по какому элементу произошёл клик )
            this.ButtonsBits.addEventListener('mousedown', function (e) {
                var ElemClick = e.target; //элемент на котором было нажатие
                if (ElemClick.tagName != 'BUTTON') return; //если не кнопка то возврат
                Bits.changeBit.call(ElemClick); // иначе вызываем метод changeBit и передаем ему контекст для выполнения элемент на который кликнули( меняет цвет кнопки и значение 0\1 )
                Bits.showRezultSort(); // запускаем метод для выбора совпадений по битам
            }, false);
        },
        random: function (min, max) { //метод возвращаем рандомное число  от min до max и возвращает его
            var rand = min + Math.random() * (max - min)
            rand = Math.round(rand);
            return rand;
        },
        changeBit: function () { //метод для изменение цвета и значения кнопок( при вызове передоется контекст выполнения )
            if (parseInt(this.innerHTML)) { //если кнопка активна
                //делаем её неактивной
                this.style.backgroundColor = "gray";
                this.innerHTML = "0";
            } else {
                //иначе делаем активной, если была неактивна
                this.style.backgroundColor = "red";
                this.innerHTML = "1";
            }
        },
        showRezultSort: function () { //метод для фильтрации результата вывода
            var BitsRezult = ""; // выделяем переменную для хранения полученной комбинации из кнопок
            this.ElemShowArray.innerHTML = ""; // отчищаем блок с результатом
            var elems = this.ButtonsBits.childNodes; // получаем массив всех кнопок        
            for (var i = 0; i < elems.length; i++) { // прогоняемся по всем кнопкам 
                BitsRezult += elems[i].innerHTML; //склеиваем все биты в переменную, получаем полное битовое значение для фильтрации
            }
            var bitFromGet = parseInt(BitsRezult, 2); // преобразуем полученную битовую комбинацию в число( в десячичную систему счисления )
            for (var i = 1; i < this.arrayNumbers.length; i++) { //проходим по всем рандомным элементам лежащих в массиве
                var bitFromArray = this.arrayNumbers[i]; //на каждой итерации кладём число в переменную            
                if (bitFromArray == bitFromGet) { //проверяем на совпадение
                    //если совпало то выводим его в блок с результатом
                    this.ElemShowArray.innerHTML += "<option>" + this.arrayNumbers[i] + "</option>";
                }
            }
        }
    }
    //////////////TEST#3///////////
var File = {
        Label: document.createTextNode("TEST#3"), //создаем текстовый элемент с названием задания
        BlockForTest_3: document.createElement('div'), // создаем блок контейнер для данного задания
        BlockForImage: document.createElement('div'), // создаем блок в котором будет выводится изображение
        InputFile: document.createElement('input'), // создаем элемент input
        ImageForPhoto: document.createElement('img'), //создаем элемент img    
        ButtonClearImage: document.createElement('button'), // создаем кнопку для отчистки localStorage
        ButtonSaveImage: document.createElement('button'), // создаем кнопку для сохранения изображения в localStorage
        init: function () { //метод для инициализации задания
            this.BlockForTest_3.classList.add("TEST#3"); //добавляем класс контейнеру для наглядности кода    
            //подписываем кнопки для сохранения и удаления изображения
            this.ButtonClearImage.innerHTML = "Clear Cache Images";
            this.ButtonSaveImage.innerHTML = "Save Image";
            //раздаем стили кому какие необходимы
            this.BlockForTest_3.style.margin = "30px";
            this.BlockForImage.style.width = "300px";
            this.BlockForImage.style.height = "300px";
            this.BlockForImage.style.borderStyle = "solid";
            this.BlockForImage.style.borderColor = "black";
            this.BlockForImage.style.borderWidth = "3px";
            this.BlockForImage.style.overflow = "hidden"; //обрезаем чтобы ничего не вылазило из блок
            this.BlockForImage.style.position = "relative";
            //расттягиваем элемент input на всю ширину и высоту родителя
            this.InputFile.style.width = "100%";
            this.InputFile.style.height = "100%";
            this.InputFile.style.opacity = "0"; //делаем его прозрачным
            this.InputFile.style.position = "absolute";
            this.ImageForPhoto.style.width = "100%";
            this.ImageForPhoto.style.height = "100%";
            this.InputFile.setAttribute("type", "file"); //делаем наш элемент input типа файл(добавляем ему атрибут type=file)
            this.InputFile.onmouseover = function () { //вешаем событие которое будет срабатывать при наведении курсора в облась элемента input
                this.style.cursor = "pointer";
            }
            this.BlockForTest_3.appendChild(this.Label); //добавляем в наш контейнер название задания
            this.BlockForImage.appendChild(this.InputFile); //в блок где будет картинка добавляем элемент input
            this.BlockForImage.appendChild(this.ImageForPhoto); //добавляем картинку 
            this.BlockForTest_3.appendChild(this.BlockForImage); //блок с изображением и input добавляем в общий контейнер
            this.BlockForTest_3.appendChild(this.ButtonSaveImage); //добавляем в контейнер кнопку для сохранения изображения
            this.BlockForTest_3.appendChild(this.ButtonClearImage); //добавляем в контейнер кнопку для удаления изображения
            Body.appendChild(this.BlockForTest_3); //весь контейнер со всеми блоками добавляем в Body
            var UrlBack = localStorage.getItem("UrlForImageBack");
            if (UrlBack) { //проверяем есть ли в localStorage уже что-то сохранённое
                this.ImageForPhoto.src = UrlBack; //если есть то отображаем изображение
            }
            this.InputFile.addEventListener('change', function () { //вешаем на элемент input событие change, которое будет срабатывать при каждом его изменении
                var file = this.files[0]; //берем файл который только что добавили
                var reader = new FileReader(); //создаем объект FileReader, благодаря которому мы в дальнейшем преобразуем наше искомое изображение в формат base64
                reader.onloadend = function () { //вераем на reader событие которое сработаеи после загрузки изображения
                    File.ImageForPhoto.src = reader.result; //добавляем нашей картинке атрибут src приравниваем его картинке в формате base64
                }
                if (file) {
                    reader.readAsDataURL(file); //Запускает процесс чтения данных указанного Blob, по завершении, аттрибут result будет содержать данные файла в виде data: URL
                } else {
                    File.ImageForPhoto.src = "";
                }
            }, false);
            //вешаем событие на кнопку для отчистки localStorage
            this.ButtonClearImage.addEventListener('mousedown', function () {
                //вызываем метод clearImage
                File.clearImage();
            }, false);
            //вешаем событие на кнопку для сохранения изображения в localStorage
            this.ButtonSaveImage.addEventListener('mousedown', function () {
                //вызываем метод saveImage и передоем ему в аргумент то что нужно сохранить в localStorage
                File.saveImage(File.ImageForPhoto.src);
            }, false);
        },
        saveImage: function (urlBase64) { //метод для сохраниения картинки в localStorage, 
            //принимает аргумент картинку( картинка в формате base64 ) и помещает её в ящейку localStorage['UrlForImageBack']
            window.localStorage.setItem("UrlForImageBack", urlBase64);
            //выводит сообщение
            alert('Your image saved!');
        },
        clearImage: function () { //метод для удаления картинки из localStorage
            window.localStorage.removeItem("UrlForImageBack");
            //выводит сообщение
            alert('LocalStorage clear!');
        }
    }
    //////////////TEST#4///////////
var CustomScroll = {
    Label: document.createTextNode("TEST#4"), //создаем текстовый элемент с названием задания
    BlockForTest_4: document.createElement('div'), // создаем блок контейнер для данного задания
    BlockScroll: document.createElement('div'), //создаем блок который будем скролить
    BlockScrollContent: document.createElement('div'), //создаем блок куда будем выводить элементы
    ChangeView: function (countStart, countEnd) { //метод который отбирает с какого по какой элементы вывести из массива
        this.BlockScrollContent.innerHTML = ""; //отчищаем блок с элементами
        this.BlockScrollContent.style.paddingTop = countStart * 20 + "px"; //расчитывает отступ сверху чтобы элементы всегда были в поле зрения
        for (countStart; countStart < countEnd; countStart++) { //продим по массиву от countStart до countEnd
            var elem = document.createElement('div'); //создаем элемент куда положим значение
            elem.style.height = "20px"; //задаем ему высоту
            elem.innerHTML = countStart; //кладём в него значение
            this.BlockScrollContent.appendChild(elem); //добавляем элемент в результирующий блок
        }
    },
    ArrayInfo: [], //какой то массив где будет что то лежвть
    init: function () { //метод инициализации данного задания
        //раздаем стили кому что нужно
        this.BlockForTest_4.style.margin = "30px";
        this.BlockScroll.style.overflowY = "scroll";
        this.BlockScroll.style.width = "200px";
        this.BlockScroll.style.height = "200px";

        this.BlockScroll.appendChild(this.BlockScrollContent); //в блок со скроллом добавляем блок в котором будем выводиться резутьтат
        this.BlockForTest_4.appendChild(this.Label); //добавляем в наш контейнер название задания
        this.BlockForTest_4.appendChild(this.BlockScroll); //блок                 

        Body.appendChild(this.BlockForTest_4); //весь контейнер со всеми блоками добавляем в Body
        for (var i = 0; i < 100; i++) {
            //заполняем наш массив цислами, можно чем угодно
            this.ArrayInfo.push(i);
        }
        var heightAll = this.ArrayInfo.length * 20; // расчитываем высоту для блока с результатом
        this.BlockScrollContent.style.height = heightAll + "px"; //устанавливаем высоту блоку 

        this.BlockScroll.onscroll = function (e) { //вешаем событие на блок который будет скроллиться
            var scrollTop = e.target.scrollTop; //получаем числовое значение на сколько от верха был проскроллен блок
            var countStart = parseInt(scrollTop / 20); // рвссчитываем с какого номера начать выводить элементы
            var countEnd = countStart + 10; // конец вывода будет через 10 элементов
            CustomScroll.ChangeView(countStart, countEnd) //запускаем метод который выведет элементы массива с countStart по countEnd и уберет лишнее
        }

        this.ChangeView(0, 10); //запускаем первый вывод элементов
    }
}

Time.init(); //запускаем метод инициальзации задания №1
Bits.init(); //запускаем метод инициальзации задания №2
File.init(); //запускаем метод инициальзации задания №3
CustomScroll.init(); //запускаем метод инициальзации задания №4