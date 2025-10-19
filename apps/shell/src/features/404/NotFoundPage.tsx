import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@workspace/ui/components/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-lg">
        {/* Main Content */}
        <div className="text-center mb-8">
          {/* 404 Number */}
          <div className="mb-6">
            <div className="text-8xl md:text-9xl font-bold text-slate-200 dark:text-slate-700 select-none">
              404
            </div>
          </div>

          {/* Title and Description */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Oops! Trang không tồn tại
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Có thể URL không chính xác hoặc trang đã được di chuyển.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại trang trước
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            <Search className="w-4 h-4" />
            <span>Bạn có thể thử tìm kiếm hoặc liên hệ hỗ trợ</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
