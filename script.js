const bads = ['임마', '바보', '미친', '성인정보', '섹스', '나쁜놈', '불륜', '자살', '낙태', '병신', '미친', '씨발', '씨바', '지랄', '니미', '씨브럴', '조까', '멍청이', '멍충이', '또라이', '개새끼', '게새끼', '개세끼', '게세끼', '꺼져', '존나', '졸라', '썅놈', '쌍놈', '애미', '애비', '에미', '에비', '지롤', '자지', '슴가', 'fuck', 'ㅄ', 'ㅁㅊ', 'ㅅㅂ', '대가리', '썅노므', '쌍노므', '씹세', '씹새', '씹쎄', '씹쌔', '시팔', '씨벌', '씨부랄', '씨팔', '처먹어', '쳐먹어', '처드셈', '처드샘', '凸', 'ajdcjddl', '개새기', '죽여', '시밤', '닥쳐', '깝치지', '이딴짓', '구라', '쇼한다', '씹년', '닥치', '개새', '개시키', '시바', 'ㅆㅂ', 'ㅆ1', 'ㅗ'];

const button = document.querySelector('#findButton');

let output = [];
let startIndex;
let newText;

button.addEventListener('click', function () {
    chrome.tabs.executeScript({
        code: "document.querySelector('#con_body > div.r_con > form > table > tbody > tr:nth-child(4) > td > iframe').contentWindow.document.querySelector('#se2_iframe').contentWindow.document.querySelector('body').innerHTML"
    }, function (result) {
        output = [];
        for(let i = 0; i < bads.length; i ++){
            startIndex = 0;
            while (1) {
                startIndex = result[0].indexOf(bads[i], startIndex);
                if (startIndex != -1) {
                    output.push({
                        index: startIndex,
                        length: bads[i].length
                    });
                    startIndex ++;
                } else {
                    break;
                }
            }
        }

        newText = result[0];
        
        output.sort(function (a, b) {
            return b.index - a.index;
        });

        for (let i = 0; i < output.length; i ++) {
            newText = newText.slice(0, output[i].index) + '<mark>' + newText.slice(output[i].index, output[i].index + output[i].length) + '</mark>' + newText.slice(output[i].index + output[i].length);
        }
        
        chrome.tabs.executeScript({
            code: "document.querySelector('#con_body > div.r_con > form > table > tbody > tr:nth-child(4) > td > iframe').contentWindow.document.querySelector('#se2_iframe').contentWindow.document.querySelector('body').innerHTML = '" + newText + "';"
        })
    });
})