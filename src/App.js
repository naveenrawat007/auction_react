import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import SignUp from './components/signup/signup.js'
import VerificationModal from './components/signup/verify_modal.js'
import TopNavbar from './components/navbar/navbar.js'
import Footer from './components/navbar/footer.js'
import ForgotPassword from './components/login/forgot_password.js'
import Sidebar from './components/user/sidebar.js'
import PropertyShow from './components/user/property/show.js'
import AdminSidebar from './components/admin/sidebar.js'
import NewPassword from './components/login/new_password.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NewProperty from './components/property/new.js';
import UserNewProperty from './components/user/property/new.js';
import PropertyEdit from './components/user/property/edit.js';
import PropertyLiveBidding from './components/property/live_bidding.js';
import PropertyBestOffer from './components/property/best_offer.js'
import PropertyPostAuction from './components/property/post_auction.js'
import PropertyPending from './components/property/pending.js'
import PropertySold from './components/property/sold.js'
import Home from './components/navbar/home.js'
import Plan from './components/user/plan/index.js'
import About from './components/static/about.js'
import Topbar from './components/static/topbar.js'
import HelpAndFaq from './components/static_help/help_and_faq.js';
import PropertyDetails from './components/user/property_edit/property_details.js'
import DealAnalysis from './components/user/property_edit/deal_analysis.js'
import OnlineBiddingOptions from './components/user/property_edit/online_bidding_options.js'
import PhotosAndVideos from './components/user/property_edit/photos_and_videos.js'
import CurrencyInput from 'react-currency-input';
import PropertyShowOne from './components/user/property/property_one.js';
import PropertyShowTwo from './components/user/property/property_two.js';
import PropertyOfferSubmit from './components/user/property/submit_offer.js';
import PropertyShowThree from './components/user/property/property_three.js';
import OfferDetail from './components/user/property/offer_detail.js';
let componentDidMount_super = CurrencyInput.prototype.componentDidMount;
CurrencyInput.prototype.componentDidMount = function() {
  this.theInput.setSelectionRange_super = this.theInput.setSelectionRange;
  this.theInput.setSelectionRange = (start, end) => {
    if (document.activeElement === this.theInput) {
      this.theInput.setSelectionRange_super(start, end);
    }
  };
  componentDidMount_super.call(this, ...arguments);
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' component = {TopNavbar}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/help" component={() => <Topbar path='qualify_deal_help'/>}/>
          <Route exact path="/help/top-15-reasons-to-post-your-wholesale-fixer-upper-deals" component={() => <Topbar path='top_reason_help'/>}/>
          <Route exact path="/help/free-landlord-analyzer/" component={() => <Topbar path='landlord_analyzer_help'/>}/>
          <Route exact path="/help/free-confidential-deal-analysis/" component={() => <Topbar path='confident_deal_help'/>}/>
          <Route exact path="/help/auction-your-wholesale-deal-to-the-highest-bidder-or-our-affiliate-partner-angel-investors-llc-will-buy-it/" component={() => <Topbar path='highest_bidder_help'/>}/>

          <Route exact path="/how-everything-works/seller" component={() => <Topbar path='seller_how_works'/>}/>
          <Route exact path="/how-everything-works/buyer" component={() => <Topbar path='buyer_how_works'/>}/>
          <Route exact path="/how-everything-works/hardmoney" component={() => <Topbar path='hardmoney_how_works'/>}/>
          <Route exact path="/how-everything-works/resources" component={() => <Topbar path='resources_how_works'/>}/>
          <Route exact path="/how-everything-works/ask-us-question" component={() => <Topbar path='ask_question_how_works'/>}/>

          <Route exact path="/realtor-portal/realtor-marketing-platform" component={() => <Topbar path='realtor_marketing_platform_realtor_portal'/>}/>
          <Route exact path="/realtor-portal/bidding-as-an-agent" component={() => <Topbar path='bidding_agent_realtor_portal'/>}/>

          <Route exact path="/frequently-asked-questions" component={() => <Topbar path='faq'/>}/>
          <Route exact path="/help-and-faq" component={HelpAndFaq}/>

          <Route exact path="/user" component={() => <Sidebar path='user_profile'/>}/>
          <Route exact path="/user/chat" component={(props) => <Sidebar {...props} path='user_chat'/>}/>
          <Route exact path="/plans" component={() => <Plan path=''/>}/>
          <Route exact path="/property/new" component={NewProperty}/>
          <Route exact path="/property/live_bidding" component={PropertyLiveBidding}/>
          <Route exact path="/property/best_offer" component={PropertyBestOffer}/>
          <Route exact path="/property/post_auction" component={PropertyPostAuction}/>
          <Route exact path="/property/pending" component={PropertyPending}/>
          <Route exact path="/property/sold" component={PropertySold}/>
          <Route exact path="/user/property/" component={() => <Sidebar path='property_list'/>}/>
          <Route exact path="/user/billing/" component={() => <Sidebar path='billing'/>}/>
          <Route exact path="/user/property/offers" component={() => <Sidebar path='offer_properties_list'/>}/>
          <Route exact path="/user/property/bids" component={() => <Sidebar path='bid_properties_list'/>}/>
          <Route exact path="/user/property/buy_now" component={() => <Sidebar path='buy_now_properties_list'/>}/>
          <Route exact path="/user/watch_properties/" component={() => <Sidebar path='watch_properties_list'/>}/>
          <Route exact path="/user/property/new" component={UserNewProperty}/>
          <Route exact path="/user/property/:id/edit" component={PropertyEdit}/>
          <Route exact path="/user/property/:id/property_details" component={PropertyDetails}/>
          <Route exact path="/user/property/:id/deal_analysis" component={DealAnalysis}/>
          <Route exact path="/user/property/:id/online_bidding_options" component={OnlineBiddingOptions}/>
          <Route exact path="/user/property/:id/photos_and_videos" component={PhotosAndVideos}/>

          <Route exact path="/property/:id" component={PropertyShow}/>
          <Route exact path="/property/:id/submit/:offer_type" component={PropertyOfferSubmit}/>
          <Route exact path="/property/:id/offer/:offer_type/:offer_id" component={OfferDetail}/>
          <Route exact path="/admin" component={() => <AdminSidebar path='all_users_list'/>}/>
          <Route exact path="/admin/chat" component={() => <AdminSidebar path='admin_chat'/>}/>
          <Route exact path="/admin/free_user" component={() => <AdminSidebar path='free_users_list'/>}/>
          <Route exact path="/admin/premium_user" component={() => <AdminSidebar path='premium_users_list'/>}/>
          <Route exact path="/admin/ban_user" component={() => <AdminSidebar path='ban_users_list'/>}/>
          <Route exact path="/admin/property/under_review" component={() => <AdminSidebar path='under_review_property_list'/>}/>
          <Route exact path="/admin/property/best_offer" component={() => <AdminSidebar path='best_offer_property_list'/>}/>
          <Route exact path="/admin/property/live_bidding" component={() => <AdminSidebar path='live_bidding_property_list'/>}/>
          <Route exact path="/admin/property/post_auction" component={() => <AdminSidebar path='post_auction_property_list'/>}/>
          <Route exact path="/admin/property/pending" component={() => <AdminSidebar path='pending_property_list'/>}/>
          <Route exact path="/admin/property/hold" component={() => <AdminSidebar path='hold_property_list'/>}/>
          <Route exact path="/admin/property/sold" component={() => <AdminSidebar path='sold_property_list'/>}/>
          <Route exact path="/admin/property/terminated" component={() => <AdminSidebar path='terminated_property_list'/>}/>
          <Route exact path="/admin/termination_request" component={() => <AdminSidebar path='termination_request_list'/>}/>
          <Route exact path="/admin/site-activity" component={() => <AdminSidebar path='admin_activity_list'/>}/>
          <Route exact path="/admin/email-system" component={() => <AdminSidebar path='email_system'/>}/>
          <Route exact path="/admin/text-system" component={() => <AdminSidebar path='text_system'/>}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign_up" component={SignUp} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/new_password" component={NewPassword} />
          <Route exact path="/verify" component={VerificationModal} />
          <Route exact path="/template-one" component={PropertyShowOne} />
          <Route exact path="/template-two" component={PropertyShowTwo} />
          <Route exact path="/template-three" component={PropertyShowThree} />
        </Switch>
        <Route path='/' component = {Footer}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
