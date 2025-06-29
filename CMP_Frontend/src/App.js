import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layouts
import { UserLayout } from "./component/UserLayout";
import { CustomerUserLayout1 } from "./component/CustomerUserLayout1";

// Pages
import { Home } from "./component/Home";
import { Login } from "./component/Login";
import UserRegister from "./component/Registor/UserRegister";
import UserFetchAll from "./component/Registor/UserFetchAll";

// Category
import { FetchAllCategory } from "./component/category/FetchAllCategory";
import { CreateCategory } from "./component/category/CreateCategory";
import { UpdateCategory } from "./component/category/UpdateCategory";

// Content
import { FetchAllContent } from "./component/content/FecthAllContent";
import { CreateContent } from "./component/content/CreateContent";
import { UpdateContent } from "./component/content/UpdateContent";

// Quiz
import { QuizPage } from "./component/QuizPage";
import { FetchAllUserHistory } from "./component/userQuizHistory/FetchAllUserHistory";

// Rewards
import { FetchAllreward } from "./component/rewards/FetchAllreward";
import { Createreward } from "./component/rewards/Createreward";
import { UpdateReward } from "./component/rewards/UpdateReward";
import { FetchCustomerRewards } from "./component/rewards/FetchCustomerRewards";

// Gift Assign
import { CreateGift } from "./component/giftassig/CreateGift";
import { FetchAllGift } from "./component/giftassig/FetchAllGift";

// Customer Home Page
import { HomeCustomerAdmin } from "./component/HomeCustormerAdmin";

// Protection
import { ProtectedRoute } from "./component/ProtectedRoute";
import { Unauthorized } from "./component/Unauthorized";
import { CategorySelector } from "./component/content/CategorySelector";
import { CategoryContentTable } from "./component/content/CategoryContentTable";
import { FetchUserHistory } from "./component/userQuizHistory/FetchUserHistory";
import { CustomerUserLayout } from "./component/CustomerUseLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<CustomerUserLayout />}>
          <Route index element={<HomeCustomerAdmin />} />
          <Route path="register" element={<UserRegister />} />
          <Route path="login" element={<Login />} />
          
        </Route>

        {/* Customer Protected Routes (roleId: 2) */}
        <Route element={<ProtectedRoute allowedRoles={[2]} />}>
          <Route path="/customer" element={<CustomerUserLayout1 />}>
            <Route index element={<HomeCustomerAdmin />} />
            <Route path="quizType/:categoryId/:createdAt" element={<QuizPage />} />
            <Route path="fetchAllReward" element={<FetchCustomerRewards />} />
            <Route path="FetchUserHistory" element={<FetchUserHistory />} />
          </Route>
        </Route>

        {/* Admin Protected Routes (roleId: 1) */}
        <Route element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route path="/admin" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="registerFetchAll" element={<UserFetchAll />} />

            {/* Category */}
            <Route path="fetchAllCategory" element={<FetchAllCategory />} />
            <Route path="createCategory" element={<CreateCategory />} />
            <Route path="updateCategory/:categoryId" element={<UpdateCategory />} />

            {/* Content */}
            <Route path="fetchAllContent" element={<FetchAllContent />} />
            <Route path="createContent" element={<CreateContent />} />
            <Route path="updateContent/:contentId" element={<UpdateContent />} />

            {/* Category-Based Filter */}
            <Route path="categorySelector" element={<CategorySelector />} />
            <Route path="categoryContent/:categoryId" element={<CategoryContentTable />} />


            {/* Rewards */}
            <Route path="fetchAllReward" element={<FetchAllreward />} />
            <Route path="createReward" element={<Createreward />} />
            <Route path="updateReward/:rewardId" element={<UpdateReward />} />

            {/* Gift Assign */}
            <Route path="createAssigned" element={<CreateGift />} />
            <Route path="fetchAllAssigned" element={<FetchAllGift />} />

            {/* User Quiz History */}
            <Route path="fetchAllUserHistory" element={<FetchAllUserHistory />} />
          </Route>
        </Route>

        {/* Unauthorized & Not Found */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
