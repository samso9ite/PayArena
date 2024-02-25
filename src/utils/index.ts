export const classnames = (...classes: any) => {
    let ret = ''
    const length = classes.length
    for (let i = 0; i < length; i++) {
        if (classes[i]) {
            ret += classes[i] + ' '
        }
    }
    return ret.trim()
}

export function copyTextToClipboard(text: string): any {
    return new Promise(async (resolve, reject) => {
        if (window.location.protocol === 'https:') {
            const clipboard = window.navigator.clipboard
            clipboard
                .writeText(text)
                .then(() => {
                    resolve('Copied to clipboard')
                })
                .catch(() => reject('Failed to copy to clipboard'))
        } else {
            // workaround for unsecured origin.
            const tempInput = document.createElement('input')
            tempInput.value = text
            document.body.appendChild(tempInput)
            tempInput.select()
            document.execCommand('copy')
            document.body.removeChild(tempInput)
            resolve('Copied to clipboard')
        }
    })
}
