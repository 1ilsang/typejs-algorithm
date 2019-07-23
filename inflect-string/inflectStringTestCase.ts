export const INFLECT_STRING_CASE: Readonly<[string, string]>[] = [
    [`Product`, `product`],
    [`SpecialGuest`, `special_guest`],
    [`SpecialGGuest`, `special_g_guest`],
    [`Donald E. Knuth`, `donald_e_knuth`],
    [`AAA`, `aaa`],
    [`1Ilsang.Blog.Me`, `ilsang_blog_me`],
    [`123$%^-`, ``],
    [`I       WANT            jOB`, `i_want_j_ob`],
    [`I       WANT            jjOB`, `i_want_jj_ob`],
    [`I       WANT            jjOjB`, `i_want_jj_oj_b`],
    [`IWANTJOB`, `iwantjob`],
    [`I WANTJOB`, `i_wantjob`],
    [`I WANTjOB`, `i_wan_tj_ob`],
    [`HTTPResponse`, `http_response`],
    [`HTTPReSponse`, `http_re_sponse`]
];
