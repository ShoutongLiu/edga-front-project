export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
    })

    $axios.onResponse(response => {
        // 请求成功返回data
        return response.data
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
    // $axios.setBaseURL('http://127.0.0.1:3000')
    $axios.setBaseURL('https://hangjia.egda.com:3000')
}