
/** @type {import('next').NextConfig} */
module.exports = {
    output:"export",
    publicRuntimeConfig: {
        staticFolder: '/static/db.json', // 这里可以是相对路径或JSON内容
    }
};