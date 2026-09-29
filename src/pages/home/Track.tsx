import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import BackButton from "../../components/buttons/BackButton";


import {
  getDriverRequestHistory,
  getRequestByTrackingCode,
} from "../../services/apiRequest";

import type {
  RequestDetails as RequestDetailsType,
  RequestHistoryItem,
  TrackRequestFormData,
} from "../../types/trackRequest.type";

import toast from "react-hot-toast";
import TrackTabs from "../../components/tabs/TrackTabs";
import RequestHistory from "../../components/features/requests/RequestHistory";
import TrackingCodeForm from "../../components/forms/TrackingCodeForm";
import RequestDetails from "../../components/features/requests/RequestDetails";
import HistoryForm from "../../components/forms/HistoryForm";

type TrackTab = "form" | "history";

export default function TrackRequest() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get("tab");

  const activeTab: TrackTab = tabParam === "history" ? "history" : "form";

  const trackingCode = searchParams.get("code") ?? "";

  const [request, setRequest] = useState<RequestDetailsType | null>(null);

  const [history, setHistory] = useState<RequestHistoryItem[] | null>(null);

  const [loading, setLoading] = useState(false);

  const [historySearched, setHistorySearched] = useState(false);

  useEffect(() => {
    if (!tabParam) {
      setSearchParams(
        {
          tab: "form",
        },
        { replace: true },
      );
    }
  }, [tabParam, setSearchParams]);

  function handleTabChange(tab: TrackTab) {
    setRequest(null);
    setHistory(null);
    setHistorySearched(false);

    if (tab === "history") {
      setSearchParams({
        tab: "history",
      });

      return;
    }

    setSearchParams({
      tab: "form",
    });
  }

  async function handleTrackingCodeSubmit(data: TrackRequestFormData) {
    try {
      setLoading(true);

      const code = data.trackingCode.trim().toUpperCase();

      const result = await getRequestByTrackingCode(code);

      if (!result) {
        toast.error("درخواستی با این کد پیگیری پیدا نشد");
        return;
      }

      setRequest(result);

      setSearchParams({
        tab: "form",
        code,
      });
    } catch (error) {
      console.error("GET REQUEST ERROR:", error);

      toast.error("دریافت درخواست انجام نشد");
    } finally {
      setLoading(false);
    }
  }

  async function handleHistorySubmit(data: TrackRequestFormData) {
    try {
      setLoading(true);

      const result = await getDriverRequestHistory({
        nationalId: data.nationalId.trim(),
        phone: data.phone.trim(),

        plate: data.identifierType === "PLATE" ? data.plate.trim() : undefined,

        transitCode:
          data.identifierType === "TRANSIT"
            ? data.transitCode.trim()
            : undefined,
      });

      setHistory(result);
      setHistorySearched(true);

      if (!result || result.length === 0) {
        toast.error("درخواستی با این اطلاعات پیدا نشد");
      }
    } catch (error) {
      console.error("GET REQUEST HISTORY ERROR:", error);

      toast.error("دریافت سوابق درخواست‌ها انجام نشد");
    } finally {
      setLoading(false);
    }
  }

  function handleNewTrackingSearch() {
    setRequest(null);

    setSearchParams({
      tab: "form",
    });
  }

  function handleNewHistorySearch() {
    setHistory(null);
    setHistorySearched(false);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-bg px-4 py-20 text-text sm:px-6">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <ClipboardList size={23} className="text-primary" />
          </div>

          <h1 className="text-2xl font-bold">پیگیری درخواست</h1>

          <p className="mt-2 text-sm text-text/60">
            وضعیت درخواست‌های حمل خود را مشاهده کنید
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
          <TrackTabs activeTab={activeTab} onChange={handleTabChange} />

          {/* -------------------------------- */}
          {/* FORM TAB */}
          {/* -------------------------------- */}

          {activeTab === "form" && !request && (
            <TrackingCodeForm
              defaultValue={trackingCode}
              loading={loading}
              onSubmit={handleTrackingCodeSubmit}
            />
          )}

          {/* -------------------------------- */}
          {/* TRACKING RESULT */}
          {/* -------------------------------- */}

          {activeTab === "form" && request && (
            <RequestDetails
              request={request}
              onNewSearch={handleNewTrackingSearch}
            />
          )}

          {/* -------------------------------- */}
          {/* HISTORY TAB */}
          {/* -------------------------------- */}

          {activeTab === "history" && !historySearched && (
            <HistoryForm loading={loading} onSubmit={handleHistorySubmit} />
          )}

          {/* -------------------------------- */}
          {/* HISTORY RESULT */}
          {/* -------------------------------- */}

          {activeTab === "history" && historySearched && (
            <RequestHistory
              history={history ?? []}
              onNewSearch={handleNewHistorySearch}
            />
          )}
        </div>

        <BackButton to="/" title="بازگشت به بارها" />
      </div>
    </main>
  );
}
