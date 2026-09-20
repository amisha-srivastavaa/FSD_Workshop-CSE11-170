import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Send,
  Settings,
  HelpCircle,
  SlidersHorizontal,
  Copy,
  Check,
  Server,
  RefreshCw,
} from 'lucide-react';

const collections = [
  {
    id: 'get-users',
    method: 'GET',
    name: 'Get All Users',
    url: 'http://localhost:3000/user',
    description: 'Retrieves all users from express backend',
    params: [],
    body: '',
  },
  {
    id: 'create-user',
    method: 'POST',
    name: 'Create User',
    url: 'http://localhost:3000/create',
    description: 'Creates a new user with name and email',
    params: [],
    body: JSON.stringify(
      {
        name: 'Amisha',
        email: 'amisha@test.com',
      },
      null,
      2
    ),
  },
  {
    id: 'get-user-by-id',
    method: 'GET',
    name: 'Get User #1',
    url: 'http://localhost:3000/user/1',
    description: 'Fetch user with ID 1',
    params: [],
    body: '',
  },
  {
    id: 'update-user',
    method: 'PUT',
    name: 'Update User #1',
    url: 'http://localhost:3000/user/1',
    description: 'Update name or email for user 1',
    params: [],
    body: JSON.stringify(
      {
        name: 'Amisha Srivastava',
        email: 'amisha.updated@gmail.com',
      },
      null,
      2
    ),
  },
  {
    id: 'delete-user',
    method: 'DELETE',
    name: 'Delete User #1',
    url: 'http://localhost:3000/user/1',
    description: 'Deletes user with specified ID',
    params: [],
    body: '',
  },
  {
    id: 'get-registered',
    method: 'GET',
    name: 'Get Registered Users',
    url: 'http://localhost:3000/registered',
    description: 'Fetch list of all registered users',
    params: [],
    body: '',
  },
  {
    id: 'register-user',
    method: 'POST',
    name: 'Register User',
    url: 'http://localhost:3000/registered',
    description: 'Register user with custom id, name, email',
    params: [],
    body: JSON.stringify(
      {
        id: 99,
        name: 'Workshop Attendee',
        email: 'workshop@abes.ac.in',
      },
      null,
      2
    ),
  },
  {
    id: 'get-sys-info',
    method: 'GET',
    name: 'System Info',
    url: 'http://localhost:3000/sys',
    description: 'Platform and uptime information from Node os module',
    params: [],
    body: '',
  },
  {
    id: 'get-server-root',
    method: 'GET',
    name: 'Server Status',
    url: 'http://localhost:3000/',
    description: 'Welcome root endpoint',
    params: [],
    body: '',
  },
];

const getMethodColor = (method) => {
  switch (method) {
    case 'GET':
      return 'bg-[#162920] text-[#4bae7b]';
    case 'POST':
      return 'bg-[#2d1f14] text-[#d97706]';
    case 'PUT':
      return 'bg-[#142332] text-[#38bdf8]';
    case 'DELETE':
      return 'bg-[#2f1618] text-[#ef4444]';
    case 'PATCH':
      return 'bg-[#261834] text-[#c084fc]';
    default:
      return 'bg-[#162920] text-[#4bae7b]';
  }
};

export default function CuteApiTester() {
  const [selectedMethod, setSelectedMethod] = useState(collections[0].method);
  const [url, setUrl] = useState(collections[0].url);
  const [activeTab, setActiveTab] = useState('Params');
  const [copied, setCopied] = useState(false);
  const [activeRequest, setActiveRequest] = useState(collections[0].id);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [viewMode, setViewMode] = useState('Pretty');
  const [backendOnline, setBackendOnline] = useState(null);

  const [params, setParams] = useState([]);
  const [body, setBody] = useState(collections[1].body);

  // Ping backend server at localhost:3000
  const checkBackendStatus = async () => {
    try {
      const res = await fetch('http://localhost:3000/', { method: 'GET' });
      setBackendOnline(res.ok);
    } catch {
      setBackendOnline(false);
    }
  };

  useEffect(() => {
    checkBackendStatus();
    const timer = setInterval(checkBackendStatus, 4000);
    return () => clearInterval(timer);
  }, []);

  const addParam = () => {
    setParams((current) => [
      ...current,
      { id: Date.now(), key: '', value: '' },
    ]);
  };

  const updateParam = (id, field, value) => {
    setParams((current) =>
      current.map((param) =>
        param.id === id ? { ...param, [field]: value } : param
      )
    );
  };

  const selectRequest = (request) => {
    setActiveRequest(request.id);
    setSelectedMethod(request.method);
    setUrl(request.url);
    if (request.body) {
      setBody(request.body);
    }
    setParams(request.params || []);
    setResponse(null);
    setResponseStatus(null);
    setResponseTime(null);
  };

  const requestUrl = useMemo(() => {
    try {
      const parsed = new URL(url);

      params.forEach(({ key, value }) => {
        if (key && key.trim()) {
          parsed.searchParams.set(key.trim(), value || '');
        }
      });

      return parsed.toString();
    } catch {
      return url;
    }
  }, [url, params]);

  const sendRequest = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResponse(null);
    setResponseStatus(null);
    setResponseTime(null);

    const startedAt = performance.now();

    try {
      const options = {
        method: selectedMethod,
        headers: {
          Accept: 'application/json',
        },
      };

      if (selectedMethod !== 'GET' && selectedMethod !== 'HEAD') {
        options.headers['Content-Type'] = 'application/json';
        options.body = body;
      }

      const targetUrl = requestUrl;

      const result = await fetch(targetUrl, options);
      const elapsed = Math.round(performance.now() - startedAt);
      const contentType = result.headers.get('content-type') || '';

      let data;
      if (contentType.includes('application/json')) {
        data = await result.json();
      } else {
        data = await result.text();
      }

      setResponse(data);
      setResponseStatus(result.status);
      setResponseTime(elapsed);
    } catch (error) {
      setResponse({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to connect to backend server. Make sure your Express server is running on port 3000.',
      });
      setResponseStatus('ERR');
      setResponseTime(Math.round(performance.now() - startedAt));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (response == null) return;

    const text =
      typeof response === 'string'
        ? response
        : JSON.stringify(response, null, 2);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked by the browser.
    }
  };

  const formattedResponse =
    typeof response === 'string'
      ? response
      : JSON.stringify(response, null, 2);

  const statusIsSuccess =
    typeof responseStatus === 'number' &&
    responseStatus >= 200 &&
    responseStatus < 300;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#0c1311] font-sans text-[#e6ece9] antialiased">
      {/* TOP BAR */}
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-[#1b2622] bg-[#0c1311] px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#4bae7b]/30 bg-[#14231c] text-[#4bae7b]">
            <Server className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#f1f5f3]">
            Express Backend Tester
          </span>
          <span className="rounded bg-[#162920] px-2 py-0.5 font-mono text-[10px] font-bold text-[#4bae7b] border border-[#4bae7b]/30">
            localhost:3000
          </span>
        </div>

        <div className="w-80">
          <div className="flex items-center gap-2.5 rounded-lg border border-[#1f2d27] bg-[#121c18] px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[#52665c]" />
            <input
              type="text"
              placeholder="Filter endpoints..."
              className="w-full bg-transparent text-xs text-[#e6ece9] outline-none placeholder:text-[#52665c]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={checkBackendStatus}
            title="Refresh backend status"
            className="rounded-md p-1.5 text-[#697f74] transition-colors hover:bg-[#14231c] hover:text-[#e6ece9]"
            aria-label="Refresh status"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4bae7b]/40 bg-[#162d22] text-[11px] font-bold text-[#4bae7b]">
            API
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* SIDEBAR */}
        <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-[#1b2622] bg-[#0e1714] p-4">
          <div className="overflow-y-auto">
            <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#556b60]">
              Backend Endpoints
            </div>

            <div className="space-y-1">
              {collections.map((request) => (
                <button
                  type="button"
                  key={request.id}
                  onClick={() => selectRequest(request)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                    activeRequest === request.id
                      ? 'bg-[#16261f] text-[#f1f5f3]'
                      : 'text-[#879d92] hover:bg-[#121c18] hover:text-[#e6ece9]'
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${getMethodColor(
                      request.method
                    )}`}
                  >
                    {request.method}
                  </span>
                  <span className="truncate">{request.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-[#1b2622] pt-3 text-xs text-[#697f74]">
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Status:</span>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    backendOnline === true
                      ? 'bg-[#4bae7b] shadow-[0_0_8px_rgba(75,174,123,0.8)]'
                      : backendOnline === false
                      ? 'bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                      : 'bg-[#eab308]'
                  }`}
                />
                <span
                  className={`font-semibold ${
                    backendOnline === true
                      ? 'text-[#4bae7b]'
                      : backendOnline === false
                      ? 'text-[#ef4444]'
                      : 'text-[#eab308]'
                  }`}
                >
                  {backendOnline === true
                    ? 'Online (3000)'
                    : backendOnline === false
                    ? 'Server Offline'
                    : 'Checking...'}
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-[#52665c]">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#e6ece9]"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Docs
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#e6ece9]"
              >
                <Settings className="h-3.5 w-3.5" />
                Config
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-[#0c1311] px-8 py-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#f1f5f3]">
                Express Backend API Tester
              </h1>
              <p className="mt-1 text-xs text-[#70877c]">
                Send requests directly to your local Express server at{' '}
                <code className="text-[#4bae7b] font-mono">http://localhost:3000</code>
              </p>
            </div>

            {/* REQUEST BAR */}
            <section>
              <div className="flex items-center rounded-xl border border-[#1f2d27] bg-[#121c18] p-1.5 focus-within:border-[#4bae7b]/60">
                <select
                  value={selectedMethod}
                  onChange={(event) => setSelectedMethod(event.target.value)}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-mono font-bold outline-none ${getMethodColor(
                    selectedMethod
                  )}`}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>

                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') sendRequest();
                  }}
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-2 text-xs font-mono text-[#e6ece9] outline-none placeholder:text-[#52665c]"
                  placeholder="http://localhost:3000/user"
                />

                <button
                  type="button"
                  onClick={sendRequest}
                  disabled={loading}
                  className="flex items-center gap-1.5 rounded-lg bg-[#4bae7b] px-5 py-2 text-xs font-bold text-[#0c1311] transition-colors hover:bg-[#5fca92] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send'}
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </section>

            {/* REQUEST CONFIG */}
            <section className="rounded-xl border border-[#1b2622] bg-[#101915]">
              <div className="flex items-center justify-between border-b border-[#1b2622] px-4">
                <div className="flex gap-5">
                  {['Params', 'Body', 'Headers'].map((tab) => (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 py-3 text-xs font-medium transition-colors ${
                        activeTab === tab
                          ? 'border-[#4bae7b] text-[#4bae7b]'
                          : 'border-transparent text-[#697f74] hover:text-[#e6ece9]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'Params' && (
                  <button
                    type="button"
                    onClick={addParam}
                    className="flex items-center gap-1 text-xs font-medium text-[#4bae7b] hover:text-[#5fca92]"
                  >
                    <Plus className="h-3 w-3" />
                    Add parameter
                  </button>
                )}
              </div>

              {activeTab === 'Params' && (
                <div className="p-4">
                  {params.length === 0 ? (
                    <div className="py-3 text-center text-xs text-[#52665c]">
                      No query parameters. Click &quot;Add parameter&quot; above to add one.
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 border-b border-[#1b2622] px-1 pb-2 font-mono text-[10px] font-semibold uppercase text-[#52665c]">
                        <span>Key</span>
                        <span>Value</span>
                      </div>

                      <div className="divide-y divide-[#1b2622]">
                        {params.map((param) => (
                          <div
                            key={param.id}
                            className="grid grid-cols-2 gap-4 px-1 py-2.5"
                          >
                            <input
                              value={param.key}
                              placeholder="key"
                              onChange={(event) =>
                                updateParam(param.id, 'key', event.target.value)
                              }
                              className="bg-transparent font-mono text-xs text-[#4bae7b] outline-none placeholder:text-[#52665c]"
                            />
                            <input
                              value={param.value}
                              placeholder="value"
                              onChange={(event) =>
                                updateParam(param.id, 'value', event.target.value)
                              }
                              className="bg-transparent font-mono text-xs text-[#e6ece9] outline-none placeholder:text-[#52665c]"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'Body' && (
                <div className="p-4">
                  <div className="mb-2 text-[11px] text-[#697f74]">
                    JSON Request Body (used for POST, PUT):
                  </div>
                  <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    spellCheck="false"
                    rows={6}
                    className="w-full resize-y rounded-lg border border-[#1b2622] bg-[#0c1311] p-3 font-mono text-xs leading-relaxed text-[#e6ece9] outline-none focus:border-[#4bae7b]/50"
                  />
                </div>
              )}

              {activeTab === 'Headers' && (
                <div className="p-4 text-xs text-[#697f74]">
                  <p>
                    Content-Type: <code className="text-[#4bae7b]">application/json</code> (automatically applied)
                  </p>
                  <p className="mt-1">
                    Accept: <code className="text-[#4bae7b]">application/json</code>
                  </p>
                </div>
              )}
            </section>

            {/* RESPONSE */}
            <section className="overflow-hidden rounded-xl border border-[#1b2622] bg-[#101915]">
              <div className="flex items-center justify-between border-b border-[#1b2622] bg-[#121c18] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#f1f5f3]">
                    Response
                  </span>

                  {responseStatus !== null && (
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold ${
                        statusIsSuccess
                          ? 'border border-[#4bae7b]/30 bg-[#162920] text-[#4bae7b]'
                          : 'border border-[#7d453e]/40 bg-[#2a1816] text-[#d98b7f]'
                      }`}
                    >
                      {responseStatus === 'ERR'
                        ? 'ERROR'
                        : `${responseStatus} ${
                            statusIsSuccess ? 'OK' : 'ERROR'
                          }`}
                    </span>
                  )}

                  {responseTime !== null && (
                    <span className="font-mono text-[11px] text-[#697f74]">
                      {responseTime} ms
                    </span>
                  )}
                </div>

                {response !== null && (
                  <div className="flex items-center gap-3">
                    <div className="flex rounded-md border border-[#1b2622] bg-[#0c1311] p-0.5 text-[11px]">
                      {['Pretty', 'Raw'].map((mode) => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setViewMode(mode)}
                          className={`rounded px-2 py-0.5 ${
                            viewMode === mode
                              ? 'bg-[#162920] text-[#4bae7b]'
                              : 'text-[#697f74] hover:text-[#e6ece9]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[11px] text-[#697f74] hover:text-[#e6ece9]"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-[#4bae7b]" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>

              <div className="min-h-56 bg-[#0c1311] p-5">
                {response === null ? (
                  <div className="flex min-h-48 flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#1b3027] bg-[#122019] text-[#4bae7b]">
                      <Send className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-[#dbe5df]">
                      Ready to test your backend.
                    </p>
                    <p className="mt-1 text-xs text-[#60766b]">
                      Click any endpoint on the left sidebar and hit &quot;Send&quot;.
                    </p>
                  </div>
                ) : (
                  <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#dbe5df]">
                    {viewMode === 'Pretty'
                      ? formattedResponse
                      : typeof response === 'string'
                        ? response
                        : JSON.stringify(response)}
                  </pre>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
