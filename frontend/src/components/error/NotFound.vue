<template>
    <div class="error">
        <div class="error_message">
            <div class="fix">
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/img/homepage/us/img-error-404.png" alt="404 Not found">
            </div>
            <p>OOPS!! The page you’re looking for doesn’t exist.</p>
            <div class="gohome">
                <router-link to="/">
                    <span>BACT TO LIST</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
};
</script>

<style>
.error {
    position: relative;
    max-width: 1164px;
    margin: 0 auto;
}

.error .error_message {
    text-align: center;
    padding-bottom: 47px;
}

.error .error_message .fix {
    padding: 50px 0 20px;
    font-size: 12px;
}

.error .error_message .gohome {
    text-align: center;
    padding-top: 8px;
}

.error .error_message .gohome span {
    font-weight: 700;
    font-size: 12px;
    display: inline-block;
    border-bottom: 1px solid #222;
}

a {
    color: #333;
    cursor: pointer;
}
</style>