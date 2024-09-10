class Menu extends BaseComponent {

    template = `
    <div class="menu">
        <ul class="list">
            <li>
                <div class="sidebar-profile clearfix">
                    <div class="profile-img">
                        <img src="assets/images/usrbig.jpg" alt="profile">
                    </div>
                    <div class="profile-info">
                        <h3 onclick="menu()">Sarah Deo</h3>
                        <p>Welcome Admin !</p>
                    </div>
                </div>
            </li>
            <li class="header">-- Main</li>
            <li class="active">
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-home"></i>
                    <span>Home</span>
                </a>
                <ul class="ml-menu">
                    <li class="active">
                        <a href="index.html">Dashboard 1</a>
                    </li>
                    <li>
                        <a href="pages/dashboard/dashboard2.html">Dashboard 2</a>
                    </li>
                    <li>
                        <a href="pages/dashboard/dashboard3.html">Dashboard 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-shopping-cart-full"></i>
                    <span>E-commerce</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/ecommerce/products.html">Products</a>
                    </li>
                    <li>
                        <a href="pages/ecommerce/product-detail.html">Product Details</a>
                    </li>
                    <li>
                        <a href="pages/ecommerce/cart.html">Cart</a>
                    </li>
                    <li>
                        <a href="pages/ecommerce/product-list.html">Product List</a>
                    </li>
                    <li>
                        <a href="pages/ecommerce/invoice.html">Invoice</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-crown"></i>
                    <span>Widgets</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/widgets/chart-widget.html">Chart Widget</a>
                    </li>
                    <li>
                        <a href="pages/widgets/data-widget.html">Data Widget</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-magnet"></i>
                    <span>User Interface (UI)</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/ui/alerts.html">Alerts</a>
                    </li>
                    <li>
                        <a href="pages/ui/animations.html">Animations</a>
                    </li>
                    <li>
                        <a href="pages/ui/badges.html">Badges</a>
                    </li>
                    <li>
                        <a href="pages/ui/modal.html">Modal</a>
                    </li>
                    <li>
                        <a href="pages/ui/buttons.html">Buttons</a>
                    </li>
                    <li>
                        <a href="pages/ui/collapse.html">Collapse</a>
                    </li>
                    <li>
                        <a href="pages/ui/dialogs.html">Dialogs</a>
                    </li>
                    <li>
                        <a href="pages/ui/cards.html">Cards</a>
                    </li>
                    <li>
                        <a href="pages/ui/labels.html">Labels</a>
                    </li>
                    <li>
                        <a href="pages/ui/list-group.html">List Group</a>
                    </li>
                    <li>
                        <a href="pages/ui/media-object.html">Media Object</a>
                    </li>
                    <li>
                        <a href="pages/ui/notifications.html">Notifications</a>
                    </li>
                    <li>
                        <a href="pages/ui/preloaders.html">Preloaders</a>
                    </li>
                    <li>
                        <a href="pages/ui/progressbars.html">Progress Bars</a>
                    </li>
                    <li>
                        <a href="pages/ui/range-sliders.html">Range Sliders</a>
                    </li>
                    <li>
                        <a href="pages/ui/sortable-nestable.html">Sortable &amp; Nestable</a>
                    </li>
                    <li>
                        <a href="pages/ui/tabs.html">Tabs</a>
                    </li>
                    <li>
                        <a href="pages/ui/waves.html">Waves</a>
                    </li>
                    <li>
                        <a href="pages/ui/typography.html">Typography</a>
                    </li>
                    <li>
                        <a href="pages/ui/helper-classes.html">Helper Classes</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-face-smile"></i>
                    <span>Icons</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/icons/material-icons.html">Material Icons</a>
                    </li>
                    <li>
                        <a href="pages/icons/font-awesome.html">Font Awesome</a>
                    </li>
                    <li>
                        <a href="pages/icons/simple-line-icons.html">Simple Line Icons</a>
                    </li>
                    <li>
                        <a href="pages/icons/themify.html">Themify Icons</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-layout"></i>
                    <span>Forms</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/forms/basic-form-elements.html">Basic Form</a>
                    </li>
                    <li>
                        <a href="pages/forms/advanced-form-elements.html">Advanced Form</a>
                    </li>
                    <li>
                        <a href="pages/forms/form-examples.html">Form Examples</a>
                    </li>
                    <li>
                        <a href="pages/forms/form-validation.html">Form Validation</a>
                    </li>
                    <li>
                        <a href="pages/forms/form-wizard.html">Form Wizard</a>
                    </li>
                    <li>
                        <a href="pages/forms/editors.html">Editors</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-menu-alt"></i>
                    <span>Tables</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/tables/normal-tables.html">Normal Tables</a>
                    </li>
                    <li>
                        <a href="pages/tables/advance-tables.html">Advance Datatables</a>
                    </li>
                    <li>
                        <a href="pages/tables/export-table.html">Export Table</a>
                    </li>
                    <li>
                        <a href="pages/tables/child-row-table.html">Child Row Table</a>
                    </li>
                    <li>
                        <a href="pages/tables/group-table.html">Grouping</a>
                    </li>
                    <li>
                        <a href="pages/tables/editable-table.html">Editable Tables</a>
                    </li>
                </ul>
            </li>
            <li class="header">-- Apps</li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-email"></i>
                    <span>Email</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/email/inbox.html">Inbox</a>
                    </li>
                    <li>
                        <a href="pages/email/compose.html">Compose</a>
                    </li>
                    <li>
                        <a href="pages/email/view-mail.html">Read Email</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="pages/apps/chat.html">
                    <i class="menu-icon ti-comment"></i>
                    <span>Chat</span>
                </a>
            </li>
            <li>
                <a href="pages/apps/calendar.html">
                    <i class="menu-icon ti-calendar"></i>
                    <span>Calendar</span>
                </a>
            </li>
            <li>
                <a href="pages/apps/task.html">
                    <i class="menu-icon ti-check-box"></i>
                    <span>Task Bar</span>
                </a>
            </li>
            <li>
                <a href="pages/apps/portfolio.html">
                    <i class="menu-icon ti-briefcase"></i>
                    <span>Portfolio</span>
                </a>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-vector"></i>
                    <span>Others</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/apps/dragdrop.html">Drag &amp; Drop</a>
                    </li>
                    <li>
                        <a href="pages/apps/contact_list.html">Contact List</a>
                    </li>
                    <li>
                        <a href="pages/apps/contact_grid.html">Contact Grid</a>
                    </li>
                    <li>
                        <a href="pages/apps/support.html">Support</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-stats-up"></i>
                    <span>Charts</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/charts/amchart.html">amChart</a>
                    </li>
                    <li>
                        <a href="pages/charts/echart.html">Echart</a>
                    </li>
                    <li>
                        <a href="pages/charts/apexcharts.html">ApexCharts</a>
                    </li>
                    <li>
                        <a href="pages/charts/morris.html">Morris</a>
                    </li>
                    <li>
                        <a href="pages/charts/chartjs.html">ChartJS</a>
                    </li>
                    <li>
                        <a href="pages/charts/sparkline.html">Sparkline</a>
                    </li>
                    <li>
                        <a href="pages/charts/jquery-knob.html">Jquery Knob</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-map-alt"></i>
                    <span>Maps</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/maps/google.html">Google Map</a>
                    </li>
                    <li>
                        <a href="pages/maps/jqvmap.html">Vector Map</a>
                    </li>
                    <li>
                        <a href="pages/maps/datamap.html">Data Map</a>
                    </li>
                </ul>
            </li>
            <li class="header">-- Extra</li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-split-v"></i>
                    <span>Timeline</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/timeline/timeline.html">Timeline 1</a>
                    </li>
                    <li>
                        <a href="pages/timeline/timeline2.html">Timeline 2</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-image"></i>
                    <span>Medias</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/medias/image-gallery.html">Image Gallery</a>
                    </li>
                    <li>
                        <a href="pages/medias/carousel.html">Carousel</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-user"></i>
                    <span>Authentication</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/examples/login-register.html">Login &amp; Register</a>
                    </li>
                    <li>
                        <a href="pages/examples/sign-in.html">Sign In</a>
                    </li>
                    <li>
                        <a href="pages/examples/sign-up.html">Sign Up</a>
                    </li>
                    <li>
                        <a href="pages/examples/forgot-password.html">Forgot Password</a>
                    </li>
                    <li>
                        <a href="pages/examples/locked.html">Locked</a>
                    </li>
                    <li>
                        <a href="pages/examples/404.html">404 - Not Found</a>
                    </li>
                    <li>
                        <a href="pages/examples/500.html">500 - Server Error</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-receipt"></i>
                    <span>Extra Pages</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="pages/examples/profile.html">Profile</a>
                    </li>
                    <li>
                        <a href="pages/examples/pricing.html">Pricing</a>
                    </li>
                    <li>
                        <a href="pages/examples/faqs.html">Faqs</a>
                    </li>
                    <li>
                        <a href="pages/examples/blank.html">Blank Page</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-angle-double-down"></i>
                    <span>Multi Level Menu</span>
                </a>
                <ul class="ml-menu">
                    <li>
                        <a href="#" onClick="return false;">
                            <span>Menu Item</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick="return false;">
                            <span>Menu Item - 2</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick="return false;" class="menu-toggle">
                            <span>Level - 2</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="#" onClick="return false;">
                                    <span>Menu Item</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick="return false;" class="menu-toggle">
                                    <span>Level - 3</span>
                                </a>
                                <ul class="ml-menu">
                                    <li>
                                        <a href="#" onClick="return false;">
                                            <span>Level - 4</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <hr>
                <div class="leftSideProgress">
                    <div class="progress-list">
                        <div class="details">
                            <div class="title">Disk Usage</div>
                        </div>
                        <div class="status">
                            <span>52</span>%
                        </div>
                        <div class="progress-s progress">
                            <div class="progress-bar progress-bar-success width-per-52" role="progressbar"
                                aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="leftSideProgress">
                    <div class="progress-list m-b-10">
                        <div class="details">
                            <div class="title">Server Load</div>
                        </div>
                        <div class="status">
                            <span>79</span>%
                        </div>
                        <div class="progress-s progress">
                            <div class="progress-bar progress-bar-warning width-per-79" role="progressbar"
                                aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    `;   

    constructor(){
        super();
        /* this.setup({
            componentName, 
            path,
            imports: [
                UIComponents.map.menuoption
            ]
        }); */
    }


}
