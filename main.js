const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
let vanities = [];
const headers = new Headers({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Cookie': '__cfduid=d4b52f522f3a3c7a98670527b519046e1501880635; _ga=GA1.2.602169896.1501880636; _gid=GA1.2.131100508.1501880636; _gat_UA-72521789-1=1'
});

for (let i = 0; i < chars.length; i++) {
    for (let j = i + 1; j < chars.length; j++) {
        vanities.push(chars[i] + chars[j]);
    }
}

const numbers = '0123456789'.split('');
for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        vanities.push(chars[i] + numbers[j]);
    }
}


const intervalId = setInterval(async () => {
    if (vanities.length > 0) {
        let vanity = vanities.shift();
        let url = "https://discord.com/api/v9/invites/" + vanity;
        await fetch(url, { headers: headers })
            .then(response => response.json())
            .then(data => {
                let message = data.hasOwnProperty('message') && data.message.includes('You are being rate limited.') ? '\x1b[31mRate limited\x1b[0m' : (data.message === 'Unknown Invite' ? '\x1b[32mNot used for any servers\x1b[0m' : '\x1b[33mAlready Used\x1b[0m');
                console.log(`🚀 discord.gg/${vanity}: ${message}`);
            })
            .catch(error => console.error(`${vanity}: Error`, error));
    } else {
        clearInterval(intervalId);
    }
}, 700); // 1000 = 1秒(早すぎるとRate limit食らいます)
