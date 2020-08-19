let $siteList = $('.siteList');
let $lastLi = $siteList.find('li.last');
let x = localStorage.getItem('x');
let xObject = JSON.parse(x);
let hashmap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
];

const simplifyUrl = url => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '');
}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashmap.forEach((node, index) => {
        let $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-baseline-close-px"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', e => {
            e.stopPropagation()
            hashmap.splice(index, 1)
            render()
        })
    })
}

render();

$('.addButton').on('click', () => {
    let url = window.prompt('请输入网址');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    hashmap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,
    });
    render();
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashmap);
    localStorage.setItem('x', string);
}

$(document).on('keypress', e => {
    const key = e.key;
    for (let i = 0; i < hashmap.length; i++) {
        if (hashmap[i].logo.toLowerCase() === key) {
            window.open(hashmap[i].url);
            break;
        }
    }
})