<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="index.aspx.vb" Inherits="PROYECTO_WEB.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>LOCSOF Computer Solutions</title>

    <%-- admin --%>
    <link href="Assets/Plugins/AdminLTE/dist/css/adminlte.min.css" rel="stylesheet" />
    <%-- icon --%>
    <link href="Assets/Plugins/fontawesome-free-5.15.1-web/css/all.css" rel="stylesheet" />
    <%-- estilos propios --%>
    <link href="Assets/Content/styles/Style.css" rel="stylesheet" />
    <%-- animaciones --%>
    <link href="Assets/Content/styles/animaciones.css" rel="stylesheet" />
    <%-- responsivo --%>
    <link href="Assets/Content/styles/mediaqueries.css" rel="stylesheet" />
    <%-- img logo --%>
    <link rel="shortcut icon" href="Assets/Content/img/logo_2.png" />
</head>
<body>
    <div class="wrapper">

        <!-- Navbar -->
        <nav class="navbar navbar-expand  m-0 d-flex justify-content-between px-5 py-0 " id="nav">
            <div class="d-flex align-content-center">
                <img src="Assets/Content/img/logo_1.png" style="height: 80px" class="img-logo" />
                <div class="logo_container  d-flex flex-column justify-content-center align-items-center pt-2">
                    <span class="text-center">LOCSOF</span>
                    <p>Computer Solutions</p>
                </div>
            </div>

            <ul class="navbar-list">
                <li><a class="navbar-link" href="#hero">Inicio</a></li>
                <li><a class="navbar-link" href="#servicios">Servicios</a></li>
                <li><a class="navbar-link" href="#contact">Contacto</a></li>
            </ul>
            <div class="ml-auto menu-icon toggle-menu">
                <i class="fas fa-bars "></i>
            </div>
        </nav>

        <%-- portada --%>
        <section class=" d-flex  justify-content-center align-items-center w-100 p-5" id="hero">
            <div class=" d-flex flex-column justify-content-around align-items-center  w-50">

                <div class="d-flex flex-column justify-content-center align-items-center" id="container_description">
                    <h1>DIGITALIZÁ TU NEGOCIO</h1>
                    <p class="p-5">En LOCSOF, somos apasionados desarrolladores de software con 5 años de experiencia en el rubro. Nuestra misión es ofrecer sistemas y aplicaciones personalizadas para empresas, pymes y negocios de todos los rubros. Nos enorgullece satisfacer las necesidades de nuestros clientes a través de soluciones informáticas innovadoras y eficientes. </p>
                </div>
                <div class="hero-info-btn">
                    <a href="#about" class="btn-more">Ver Más<i class="fas fa-arrow-down ml-1"></i>
                    </a>
                    <a href="#contact" class="btn-more">Contacto <i class="fas fa-envelope ml-1"></i>
                    </a>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center w-50" id="container_img">
                <img src="Assets/Content/img/logo_2.png" style="height: 200px" class="img-logo" />
                <span class="">LOCSOF</span>
                <p>Computer Solutions</p>
            </div>

        </section>

        <%-- servicios --%>
        <section class=" d-flex flex-column w-100 p-3 bg-dark" id="servicios">
            <h1>¿POR QUÉ ELEGIRNOS?</h1>
            <div class="row w-100 servicios_Container">
                <div class="col">
                    <div class="card card_Servicios" style="width: 18rem;">
                        <img src="Assets/Content/img/colaboracion.jpg" class="card-img-top" alt="LOCSOFT - calidad - software" />
                        <div class="card-body">
                            <h5 class="card-title ">Calidad</h5>
                            <p class="card-text">Creamos software robusto y confiable que impulsa el éxito de nuestros clientes.</p>

                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card_Servicios" style="width: 18rem;">
                        <img src="Assets/Content/img/negocios.jpg" class="card-img-top" alt="LOCSOFT - mercado - empresas" />
                        <div class="card-body">
                            <h5 class="card-title ">Adaptabilidad</h5>
                            <p class="card-text">Nos adaptamos a las necesidades cambiantes del mercado y las empresas.</p>

                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card_Servicios" style="width: 18rem;">
                        <img src="Assets/Content/img/clientes.jpg" class="card-img-top" alt="LOCSOFT - clientes - software" />
                        <div class="card-body">
                            <h5 class="card-title ">Colaboración</h5>
                            <p class="card-text">Trabajamos con nuestros clientes para lograr resultados excepcionales.</p>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>


    <%-- jquery --%>
    <script src="Assets/Plugins/jquery/jquery.3.5.1.min.js"></script>
    <%-- icon --%>
    <script src="Assets/Plugins/fontawesome-free-5.15.1-web/js/all.js"></script>
    <%--  AdminLTE --%>
    <script src="Assets/Plugins/AdminLTE/dist/js/adminlte.js"></script>
    <%-- js propio --%>
    <script src="Assets/Content/js/index.js"></script>


</body>
</html>
