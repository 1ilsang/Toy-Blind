<template>
    <div class="lst_area">
        <div class="search keyword">
            <div class="srch">
                <a href="javascript:window.history.back()" class="btn_prv"></a>
                <div class="input_wrap"><input type="search" id="keyword" name="keyword"
                                               placeholder="Keywords, #hashtag" autocomplete="off"></div>
            </div>
        </div>
        <div class="popular_keyword top20">
            <div class="wrap">
                <div class="part_keyword"><h2>POPULAR KEYWORDS</h2>
                    <div class="list_wrap">
                        <ol>
                            <li><em>01</em> <a href="/search/google" class=""><span>google</span></a></li>
                            <li><em>02</em> <a href="/search/facebook" class=""><span>facebook</span></a></li>
                            <li><em>03</em> <a href="/search/uber" class=""><span>uber</span></a></li>
                            <li><em>04</em> <a href="/search/amazon" class=""><span>amazon</span></a></li>
                            <li><em>05</em> <a href="/search/microsoft " class=""><span>microsoft </span></a></li>
                            <li><em>06</em> <a href="/search/apple " class=""><span>apple </span></a></li>
                            <li><em>07</em> <a href="/search/airbnb" class=""><span>airbnb</span></a></li>
                            <li><em>08</em> <a href="/search/stripe" class=""><span>stripe</span></a></li>
                            <li><em>09</em> <a href="/search/linkedin" class=""><span>linkedin</span></a></li>
                            <li><em>10</em> <a href="/search/salesforce" class=""><span>salesforce</span></a></li>
                            <li><em>11</em> <a href="/search/tesla" class=""><span>tesla</span></a></li>
                            <li><em>12</em> <a href="/search/netflix" class=""><span>netflix</span></a></li>
                            <li><em>13</em> <a href="/search/oracle" class=""><span>oracle</span></a></li>
                            <li><em>14</em> <a href="/search/cisco" class=""><span>cisco</span></a></li>
                            <li><em>15</em> <a href="/search/doordash" class=""><span>doordash</span></a></li>
                            <li><em>16</em> <a href="/search/lyft" class=""><span>lyft</span></a></li>
                            <li><em>17</em> <a href="/search/wayfair" class=""><span>wayfair</span></a></li>
                            <li><em>18</em> <a href="/search/cruise" class=""><span>cruise</span></a></li>
                            <li><em>19</em> <a href="/search/workday" class=""><span>workday</span></a></li>
                            <li><em>20</em> <a href="/search/india" class=""><span>india</span></a></li>
                        </ol>
                    </div>
                </div>
                <div class="part_ad">
                    <div class="adwrap"><a
                            href="//www.rooftopslushie.com/?utm_source=blind_web&amp;utm_medium=search_banner&amp;utm_campaign=s_a9"
                            target="_blank">
                        <div></div>
                    </a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search'
    }
</script>

<style>
    .search {
        position: relative;
        overflow: auto;
    }

    .search .srch {
        position: relative;
        border-top: 1px solid transparent;
        margin: 21.5px 30px 10px;
    }

    .search .srch .btn_prv {
        position: absolute;
        top: 50%;
        left: 13px;
        z-index: 1;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        opacity: .5;
        margin-top: 1px;
        display: inline-block;
        vertical-align: middle;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
    }
    .search .srch .btn_prv {
        width: 6.5px;
        height: 11px;
        background-position: -290px -143px;
    }
    .search .srch .btn_prv:after {
        content: "";
        position: absolute;
        top: -5px;
        left: -5px;
        width: 100%;
        height: 100%;
        padding: 5px;
        background-color: red;
        opacity: 0;
    }
    .search .srch .input_wrap {
        width: 100%;
        height: 40px;
        background: #eceef3;
        box-sizing: border-box;
        padding-right: 31px;
    }
    .search .srch .input_wrap input {
        display: inline-block;
        padding-left: 26px;
        margin-top: 11px;
        width: 100%;
        height: auto;
        font-size: 16px;
        box-sizing: border-box;
        -webkit-appearance: none;
        background: transparent;
        border: 0;
    }

    a {
        text-decoration: none;
    }

    .popular_keyword {
        position: relative;
        margin-top: 13px;
    }
    .popular_keyword .wrap {
        max-width: 1164px;
        margin: 0 auto;
    }
    .popular_keyword h2 {
        padding: 20px 0 19px 30px;
        font-size: 14px;
        font-weight: 700;
        box-sizing: border-box;
        text-transform: uppercase;
        border-bottom: 1px solid #eceef3;
    }
    .popular_keyword .part_keyword h2+.list_wrap {
        border-bottom: 0;
    }
    .popular_keyword .list_wrap {
        padding: 18px 30px 21px;
        border-bottom: 1px solid #94969b;
        box-sizing: border-box;
    }
    .popular_keyword .list_wrap ol {
        -moz-column-gap: 0;
        -webkit-column-gap: 0;
        grid-column-gap: 0;
        column-gap: 0;
        -moz-column-count: 2;
        -webkit-column-count: 2;
        column-count: 2;
        list-style: none;
    }
    .popular_keyword .list_wrap ol li span {
        display: block;
        padding-left: 20.5px;
        font-weight: 400;
        color: #37acc9;
    }
    .popular_keyword .list_wrap ol li em {
        position: absolute;
        left: 0;
        top: 9.5px;
        color: #94969b;
        font-weight: 400;
        letter-spacing: -1px;
        display: block;
        min-width: 12px;
        text-align: right;
    }
    .popular_keyword .list_wrap ol li {
        position: relative;
        font-size: 14px;
        padding: 9.5px 7px 9px 0;
        box-sizing: border-box;
        vertical-align: bottom;
        letter-spacing: -.2px;
    }
    em {
        font-style: normal;
    }
    a {
        color: #333;
        cursor: pointer;
        text-decoration: none;
    }
    .lst_area {
        position: relative;
        border-top: 10px solid #eceef3;
        padding: 0;
        border-bottom: 0;
        background-color: #fff;
    }
</style>