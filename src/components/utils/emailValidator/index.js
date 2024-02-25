
export const emailValidator = (email)=>{
    let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;

    let gmail_domain = new RegExp('[a-z0-9]+@gmail.com');
    let email_domain = new RegExp('[a-z0-9]+@email.com');
    let yahoo_domain = new RegExp('[a-z0-9]+@yahoo.com');
    let outlook_domain = new RegExp('[a-z0-9]+@outlook.com');
    let live_domain = new RegExp('[a-z0-9]+@live.com');
    let hotmail_domain = new RegExp('[a-z0-9]+@hotmail.com');
    let aol_domain = new RegExp('[a-z0-9]+@aol.com');
    let hotmail_uk_domain = new RegExp('[a-z0-9]+@hotmail.co.uk');
    let hotmail_fr_domain = new RegExp('[a-z0-9]+@hotmail.fr');
    let icloud_domain = new RegExp('[a-z0-9]+@icloud.com');
    let inbox_domain = new RegExp('[a-z0-9]+@inbox.com');
    let mail_domain = new RegExp('[a-z0-9]+@mail.com');
    let gmx_domain = new RegExp('[a-z0-9]+@gmx.com');
    let zoho_domain = new RegExp('[a-z0-9]+@zoho.com');
    let protonmail_domain = new RegExp('[a-z0-9]+@protonmail.com');
    let msn_domain = new RegExp('[a-z0-9]+@msn.com');
    let yahoo_fr_domain = new RegExp('[a-z0-9]+@yahoo.fr');
    let wanadoo_fr_domain = new RegExp('[a-z0-9]+@wanadoo.fr');
    let orange_fr_domain = new RegExp('[a-z0-9]+@orange.fr');
    let comcast_domain = new RegExp('[a-z0-9]+@comcast.net');
    let yahoo_uk_domain = new RegExp('[a-z0-9]+@yahoo.co.uk');
    let yahoo_br_domain = new RegExp('[a-z0-9]+@yahoo.com.br');
    let yahoo_co_in_domain = new RegExp('[a-z0-9]+@yahoo.co.in');
    let rediffmail_domain = new RegExp('[a-z0-9]+@rediffmail.com');
    let free_fr_domain = new RegExp('[a-z0-9]+@free.fr');
    let gmx_de_domain = new RegExp('[a-z0-9]+@gmx.de');
    let web_de_domain = new RegExp('[a-z0-9]+@web.de');
    let yandex_ru_domain = new RegExp('[a-z0-9]+@yandex.ru');
    let ymail_domain = new RegExp('[a-z0-9]+@ymail.com');
    let libero_it_domain = new RegExp('[a-z0-9]+@libero.it');
    let uol_br_domain = new RegExp('[a-z0-9]+@uol.com.br');
    let bol_br_domain = new RegExp('[a-z0-9]+@bol.com.br');
    let mail_ru_domain = new RegExp('[a-z0-9]+@mail.ru');
    let cox_net_domain = new RegExp('[a-z0-9]+@cox.net');
    let hotmail_it_domain = new RegExp('[a-z0-9]+@hotmail.it');
    let sbcglobal_domain = new RegExp('[a-z0-9]+@sbcglobal.net');
    let sfr_fr_domain = new RegExp('[a-z0-9]+@sfr.fr');
    let live_fr_domain = new RegExp('[a-z0-9]+@live.fr');
    let verizon_domain = new RegExp('[a-z0-9]+@verizon.net');
    let live_uk_domain = new RegExp('[a-z0-9]+@live.co.uk');
    let googlemail_domain = new RegExp('[a-z0-9]+@googlemail.com');
    let yahoo_es_domain = new RegExp('[a-z0-9]+@yahoo.es');
    let ig_br_domain = new RegExp('[a-z0-9]+@ig.com.br');
    let live_nl_domain = new RegExp('[a-z0-9]+@live.nl');
    let bigpond_domain = new RegExp('[a-z0-9]+@bigpond.com');
    let terra_br_domain = new RegExp('[a-z0-9]+@terra.com.br');
    let yahoo_it_domain = new RegExp('[a-z0-9]+@yahoo.it');
    let neuf_fr_domain = new RegExp('[a-z0-9]+@neuf.fr');
    let yahoo_de_domain = new RegExp('[a-z0-9]+@yahoo.de');
    let alice_it_domain = new RegExp('[a-z0-9]+@alice.it');
    let rocketmail_domain = new RegExp('[a-z0-9]+@rocketmail.com');
    let att_domain = new RegExp('[a-z0-9]+@att.net');
    let laposte_domain = new RegExp('[a-z0-9]+@laposte.net');
    let facebook_domain = new RegExp('[a-z0-9]+@facebook.com');
    let bellsouth_domain = new RegExp('[a-z0-9]+@bellsouth.net');
    let yahoo_in_domain = new RegExp('[a-z0-9]+@yahoo.in');
    let hotmail_es_domain = new RegExp('[a-z0-9]+@hotmail.es');
    let charter_domain = new RegExp('[a-z0-9]+@charter.net');
    let yahoo_ca_domain = new RegExp('[a-z0-9]+@yahoo.ca');
    let yahoo_au_domain = new RegExp('[a-z0-9]+@yahoo.com.au');
    let rambler_ru_domain = new RegExp('[a-z0-9]+@rambler.ru');
    let hotmail_de_domain = new RegExp('[a-z0-9]+@hotmail.de');
    let tiscali_it_domain = new RegExp('[a-z0-9]+@tiscali.it');
    let shaw_ca_domain = new RegExp('[a-z0-9]+@shaw.ca');
    let yahoo_jp_domain = new RegExp('[a-z0-9]+@yahoo.co.jp');
    let sky_domain = new RegExp('[a-z0-9]+@sky.com');
    let earthlink_domain = new RegExp('[a-z0-9]+@earthlink.net');
    let optonline_domain = new RegExp('[a-z0-9]+@optonline.net');
    let freenet_de_domain = new RegExp('[a-z0-9]+@freenet.de');
    let t_online_de_domain = new RegExp('[a-z0-9]+@t-online.de');
    let aliceadsl_fr_domain = new RegExp('[a-z0-9]+@aliceadsl.fr');
    let virgilio_domain = new RegExp('[a-z0-9]+@virgilio.it');
    let home_nl_domain = new RegExp('[a-z0-9]+@home.nl');
    let qq_domain = new RegExp('[a-z0-9]+@qq.com');
    let telenet_be_domain = new RegExp('[a-z0-9]+@telenet.be');
    let me_domain = new RegExp('[a-z0-9]+@me.com');
    let yahoo_ar_domain = new RegExp('[a-z0-9]+@yahoo.com.ar');
    let tiscali_uk_domain = new RegExp('[a-z0-9]+@tiscali.co.uk');
    let yahoo_mx_domain = new RegExp('[a-z0-9]+@yahoo.com.mx');
    let voila_fr_domain = new RegExp('[a-z0-9]+@voila.fr');
    let gmx_net_domain = new RegExp('[a-z0-9]+@gmx.net');
    let planet_nl_domain = new RegExp('[a-z0-9]+@planet.nl');
    let tin_domain = new RegExp('[a-z0-9]+@tin.it');
    let live_it_domain = new RegExp('[a-z0-9]+@live.it');
    let ntlworld_domain = new RegExp('[a-z0-9]+@ntlworld.com');
    let arcor_de_domain = new RegExp('[a-z0-9]+@arcor.de');
    let yahoo_id_domain = new RegExp('[a-z0-9]+@yahoo.co.id');
    let frontiernet_net_domain = new RegExp('[a-z0-9]+@frontiernet.net');
    let hetnet_nl_domain = new RegExp('[a-z0-9]+@hetnet.nl');
    let live_au_domain = new RegExp('[a-z0-9]+@live.com.au');
    let yahoo_sg_domain = new RegExp('[a-z0-9]+@yahoo.com.sg');
    let zonnet_nl_domain = new RegExp('[a-z0-9]+@zonnet.nl');
    let club_internet_fr_domain = new RegExp('[a-z0-9]+@club-internet.fr');
    let juno_domain = new RegExp('[a-z0-9]+@juno.com');
    let optusnet_au_domain = new RegExp('[a-z0-9]+@optusnet.com.au');
    let blueyonder_uk_domain = new RegExp('[a-z0-9]+@blueyonder.co.uk');
    let bluewin_ch_domain = new RegExp('[a-z0-9]+@bluewin.ch');
    let skynet_be_domain = new RegExp('[a-z0-9]+@skynet.be');
    let sympatico_ca_domain = new RegExp('[a-z0-9]+@sympatico.ca');
    let windstream_domain = new RegExp('[a-z0-9]+@windstream.net');
    let mac_domain = new RegExp('[a-z0-9]+@mac.com');
    let centurytel_domain = new RegExp('[a-z0-9]+@centurytel.net');
    let chello_nl_domain = new RegExp('[a-z0-9]+@chello.nl');
    let live_ca_domain = new RegExp('[a-z0-9]+@live.ca');
    let aim_domain = new RegExp('[a-z0-9]+@aim.com');
    let bigpond_au_domain = new RegExp('[a-z0-9]+@bigpond.net.au');
    let gmail_co_domain = new RegExp('[a-z0-9]+@gmail.co');
    let yahoo_co_domain = new RegExp('[a-z0-9]+@yahoo.co');
    let yopmail_domain = new RegExp('[a-z0-9]+@yopmail.com');
    let yahoo_co_za_domain = new RegExp('[a-z0-9]+@yahoo.co.za');
    
    


    if (!email) {
        return {status:false, message:"Email address is required"}
    }
    else if (email_reg.test(email) === false) {
        return {status:false, message:"Invalid email address"}
    }
    else if (
        gmail_domain.test(email) === true || email_domain.test(email) === true || yahoo_domain.test(email) === true || 
        outlook_domain.test(email) === true || live_domain.test(email) === true || hotmail_domain.test(email) === true ||
        aol_domain.test(email) === true || hotmail_uk_domain.test(email) === true || hotmail_fr_domain.test(email) === true ||
        icloud_domain.test(email) === true || inbox_domain.test(email) === true || mail_domain.test(email) === true || 
        gmx_domain.test(email) === true || zoho_domain.test(email) === true || protonmail_domain.test(email) === true ||
        msn_domain.test(email) === true || yahoo_fr_domain.test(email) === true || wanadoo_fr_domain.test(email) === true || orange_fr_domain.test(email) === true ||
        comcast_domain.test(email) === true || yahoo_uk_domain.test(email) === true || yahoo_br_domain.test(email) === true ||
        yahoo_co_in_domain.test(email) === true || rediffmail_domain.test(email) === true || free_fr_domain.test(email) === true ||
        gmx_de_domain.test(email) === true || web_de_domain.test(email) === true || yandex_ru_domain.test(email) === true || 
        ymail_domain.test(email) === true || libero_it_domain.test(email) === true || uol_br_domain.test(email) === true || 
        bol_br_domain.test(email) === true || mail_ru_domain.test(email) === true || cox_net_domain.test(email) === true || 
        hotmail_it_domain.test(email) === true || sbcglobal_domain.test(email) === true || sfr_fr_domain.test(email) === true ||
        live_fr_domain.test(email) === true || verizon_domain.test(email) === true || live_uk_domain.test(email) === true || 
        googlemail_domain.test(email) === true || yahoo_es_domain.test(email) === true || ig_br_domain.test(email) === true ||
        live_nl_domain.test(email) === true || bigpond_domain.test(email) === true || terra_br_domain.test(email) === true ||
        yahoo_it_domain.test(email) === true || neuf_fr_domain.test(email) === true || yahoo_de_domain.test(email) === true ||
        alice_it_domain.test(email) === true || rocketmail_domain.test(email) === true || att_domain.test(email) === true ||
        laposte_domain.test(email) === true || facebook_domain.test(email) === true || bellsouth_domain.test(email) === true ||
        yahoo_in_domain.test(email) === true || hotmail_es_domain.test(email) === true || charter_domain.test(email) === true ||
        yahoo_ca_domain.test(email) === true || yahoo_au_domain.test(email) === true || rambler_ru_domain.test(email) === true ||
        hotmail_de_domain.test(email) === true || tiscali_it_domain.test(email) === true || shaw_ca_domain.test(email) === true ||
        yahoo_jp_domain.test(email) === true || sky_domain.test(email) === true || earthlink_domain.test(email) === true ||
        optonline_domain.test(email) === true || freenet_de_domain.test(email) === true || t_online_de_domain.test(email) === true || aliceadsl_fr_domain.test(email) === true ||
        home_nl_domain.test(email) === true || qq_domain.test(email) === true || telenet_be_domain.test(email) === true || 
        me_domain.test(email) === true || yahoo_ar_domain.test(email) === true || tiscali_uk_domain.test(email) === true ||
        yahoo_mx_domain.test(email) === true || voila_fr_domain.test(email) === true || gmx_net_domain.test(email) === true ||
        planet_nl_domain.test(email) === true || tin_domain.test(email) === true || live_it_domain.test(email) === true ||
        ntlworld_domain.test(email) === true || arcor_de_domain.test(email) === true || yahoo_id_domain.test(email) === true ||
        frontiernet_net_domain.test(email) === true || hetnet_nl_domain.test(email) === true || live_au_domain.test(email) === true || 
        yahoo_sg_domain.test(email) === true || zonnet_nl_domain.test(email) === true || club_internet_fr_domain.test(email) === true ||
        juno_domain.test(email) === true || optusnet_au_domain.test(email) === true || blueyonder_uk_domain.test(email) === true ||
        bluewin_ch_domain.test(email) === true || skynet_be_domain.test(email) === true || sympatico_ca_domain.test(email) === true ||
        windstream_domain.test(email) === true || mac_domain.test(email) === true || centurytel_domain.test(email) === true ||
        chello_nl_domain.test(email) === true || live_ca_domain.test(email) === true || aim_domain.test(email) === true ||
        bigpond_au_domain.test(email) === true || virgilio_domain.test(email) === true || gmail_co_domain.test(email) === true ||
        yahoo_co_domain.test(email) === true || yopmail_domain.test(email) === true || yahoo_co_za_domain.test(email) === true
    ){
        return {status:false, message:"Please input workplace email"}
    }
    return {status:true, message:"Valid email address"}
}