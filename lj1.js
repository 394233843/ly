let LJ = {
    init() {
        this.initUI();
        this.initEvent();
    },
    initUI() {
        this.animateBox = $('.js-animate-box');
    },
    initEvent() {
        let that = this;
        console.log(that.animateBox)
        this.animateBox.delegate('.js-page', 'click', function (e) {
            let domId = $(this).attr('id')
            let curPos = that.getCurSectionAndPageByDomId(domId);
            let calcPos = that.calcNextPagePos(curPos);
            if (!calcPos) {
                return;
            }
            let args = that.createAnimateArgs(calcPos);
            that.animateAc(args);
        });

        $(document).keydown(function (e) {
            let keyCode = e.keyCode;
            let isKeyMaped = this.data.keyMap(keyCode);
            if (isKeyMaped) {
                that.onArrowDown(keyCode);
            }
        });
    },
    data: {
        curPos: {
            section: '1',
            page: '1'
        },
        keyMap: {
            '40': 'down'
        }
    },
    onArrowDown(keyCode) {
        let curPos = this.getCurSectionAndPageByData();
        let calcPos = that.calcNextPagePos(curPos);
        if (!calcPos) {
            return;
        }
        let args = this.createAnimateArgs(calcPos);
        let direction = this.data.keyMap(keyCode);
        this.animateAc(args, direction);
    },
    calcNextPagePos({
        section,
        page
    }) {
        let end = false;
        section = parseInt(section);
        page = parseInt(page);
        console.log('section', section, 'page', page)
        switch (section) {
            case 1:
                if (page >= 4) {
                    section++;
                    page = 1;
                } else {
                    page++;
                }
                break;

            case 2:
            case 8:
                if (page >= 6) {
                    section++;
                    page = 1;
                } else {
                    page++;
                }
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                if (page >= 7) {
                    section++;
                    page = 1;
                } else {
                    page++;
                }
                break;
            case 9:
                if (page >= 4) {
                    end = true;
                } else {
                    page++;
                }
                break;
            default:
                section = 1;
                page = 1;
                break;
        }
        let nextPagePos = {
            section,
            page
        };
        console.log(nextPagePos)
        return end ? false : nextPagePos;
    },
    getCurSectionAndPageByDomId(domId) {
        let secAndPageReg = /(?:\/section-)(?<section>\d+?)(?:\/page-)(?<page>\d+?)/g;
        let secAndPageRes = secAndPageReg.exec(domId);
        let {
            section,
            page
        } = secAndPageRes.groups;
        return {
            section,
            page
        }
    },
    getCurSectionAndPageByData() {
        let pos = this.data.curPos;
        return Object.assign({}, pos);
    },
    createAnimateArgs({
        section,
        page
    }, direction = 'down') {
        let top, left, animateObj;

        switch (direction) {
            case 'down':
                left = '-' + ((parseInt(section) - 1) * 100) + '%';
                top = '-' + ((parseInt(page) - 1) * 100) + '%';
                animateObj = {
                    left,
                    top
                }
                break;
            default:
                break;
        };
        return animateObj;
    },
    animateAc(animateObj) {
        this.animateBox.animate(animateObj);
        this.setCurPos(animateObj);
    },
    setCurPos(pos) {
        this.data.curPos = Object.assign({}, pos);
    }
}
$(LJ.init());