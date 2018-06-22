class Exam {
    constructor(wrap) {
        this.wrap = wrap;
        this.obj = [];
        this.html = "";

        let index = 0,
            temp = "";
        // for (let i = 0; i < this.wrap.childNodes.length; i++) {
        for (let i = 0; i < 63; i++) {
            if (this.wrap.childNodes[i].innerHTML ? this.wrap.childNodes[i].innerHTML.replace(/\s/g, "") : this.wrap.childNodes[i].textContent.replace(/\s/g, "")) {
                //html内容
                temp += this.wrap.childNodes[i].outerHTML ? this.wrap.childNodes[i].outerHTML : this.wrap.childNodes[i].textContent
                //dom元素push进obj题目的数组
                this.obj[index] = this.obj[index] ? this.obj[index] : {};
                this.obj[index].arr = this.obj[index].arr ? this.obj[index].arr : []
                this.obj[index].arr.push(this.wrap.childNodes[i])
                //判断节点分割题目
                if (i + 1 >= this.wrap.childNodes.length - 1 || (this.wrap.childNodes[i + 1] && this.wrap.childNodes[i + 1].textContent.indexOf('QUESTION') > -1)) {
                    this.html += temp;

                    this.obj[index].html = temp;
                    this.obj[index].sl = '';
                    this.obj[index].index = index + 1;
                    this.travel(this.obj[index], index);

                    temp = "";
                    index++;
                }
            }
        }
    }

    travel(obj, index) {
        let s_index = -1,
            e_index = -1;
        obj.qes = ''; obj.options = []; obj.ans = '';
        for (let j = 0; j < obj.arr.length; j++) {
            if (s_index === -1 && obj.arr[j].textContent.match(/A\./)) {
                s_index = j;
            }
            if (e_index === -1 && obj.arr[j].textContent.match(/Correct/)) {
                e_index = j;
            }
            if (s_index != -1 || e_index != -1) {
                if (s_index != -1 && obj.arr[j].textContent.match(/[A-Z]\./)) {
                    obj.options.push(obj.arr[j])
                }
                if (e_index != -1) {
                    obj.ans += obj.arr[j].textContent
                }
            } else if (obj.arr[j].textContent.indexOf('QUESTION') < 0) {
                obj.qes += obj.arr[j].outerHTML ? obj.arr[j].outerHTML : obj.arr[j].textContent
            }
        }
        obj.ans = obj.ans.substring(obj.ans.indexOf(': ') + 2, obj.ans.indexOf('Section'));
    }
    score(per) {
        let score = 0;
        this.obj.forEach((el, index) => {
            if (el.sl && el.ans) {
                score += ((el.sl === el.ans) ? 1 : 0)
            }
        })
        if (per) {
            return score * per;
        } else {
            return score
        }
    }
}
Array.prototype.shuffle = function () {
    var arr = this;
    for (var i = arr.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = arr[randomIndex];

        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
    return arr;
}