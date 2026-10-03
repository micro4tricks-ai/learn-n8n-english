// n8n week 44 — Kubernetes, scaling and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('Kubernetes والتوسّع ومشروع الشهر', 'Kubernetes, scaling and the month project'),
  goal: B('تشغّل n8n على Kubernetes لما الحجم يستاهل: تفهم المفاهيم الأساسية، تنشر queue mode بـ manifests أو Helm، تدير الأسرار والإعدادات، تكبّر الـ workers آليًا على طول الطابور، تحدّث بأمان بـ GitOps — وتعرف إمتى Kubernetes مبالغة. وتسلّم مشروع الشهر الحادي عشر.',
          'Run n8n on Kubernetes when the size justifies it: understand the core concepts, deploy queue mode with manifests or Helm, manage secrets and config, autoscale workers on queue length, update safely with GitOps — and know when Kubernetes is overkill. And deliver the eleventh month’s project.'),
  days: [
    { title: B('Kubernetes ليه وإمتى', 'Kubernetes: why and when'),
      goal: B('تفهم الأساسيات وتقرر بصراحة.', 'Understand the basics and decide honestly.'),
      learn: [
        L(B('المفاهيم', 'The concepts'),
          B('**kubernetes** بيشغّل containers على مجموعة سيرفرات: **pod** (container أو أكتر)، Deployment (عدد نسخ من pod ويحدّثها)، Service (عنوان ثابت للـ pods)، **ingress** (الدخول من النت بـ TLS)، ConfigMap وSecret (إعدادات وأسرار)، **namespace** (فصل عملاء أو بيئات). انت بتوصف «الحالة المطلوبة» وهو بيحافظ عليها.', '**kubernetes** runs containers across a group of servers: a **pod** (one or more containers), a Deployment (a number of pod copies, updated for you), a Service (a stable address for pods), an **ingress** (entry from the internet with TLS), ConfigMap and Secret (settings and secrets), a **namespace** (separating clients or environments). You describe the «desired state» and it maintains it.'),
          'namespace n8n-clientA\n  Deployment n8n-main (1)      Deployment n8n-webhook (2)      Deployment n8n-worker (3–10, autoscaled)\n  Service n8n-main:5678         Service n8n-webhook:5678\n  Ingress n8n.client-a.com  →  /webhook/* → n8n-webhook · everything else → n8n-main\n  ConfigMap n8n-config · Secret n8n-secrets · external: managed Postgres + Redis'),
        L(B('إمتى يستاهل؟', 'When is it worth it?'),
          B('Kubernetes قوي بس معقد: محتاج حد فاهمه، ومراقبة، وتحديثات للـ cluster نفسه. يستاهل لما: عملاء كتير (namespace لكل واحد)، autoscaling حقيقي، الشركة عندها cluster جاهز وفريق، أو متطلبات مؤسسية. لعميل واحد بحجم متوسط: Docker Compose على سيرفرين + managed DB أبسط وأرخص وأثبت.', 'Kubernetes is powerful but complex: it needs someone who understands it, monitoring, and updates to the cluster itself. Worth it when: many clients (a namespace each), real autoscaling, the company already has a cluster and a team, or enterprise requirements. For one mid-sized client: Docker Compose on two servers + a managed DB is simpler, cheaper and steadier.'),
          'choose Compose when: 1–3 clients · < ~300k runs/day · no in-house Kubernetes skills\nchoose Kubernetes when: 10+ isolated tenants · spiky load needing autoscaling · client mandates K8s · a platform team exists\nmanaged Kubernetes (GKE, EKS, AKS, DigitalOcean) — never run the control plane yourself for this'),
        L(B('managed Kubernetes', 'Managed Kubernetes'),
          B('**managed kubernetes** (DigitalOcean، GKE Autopilot، EKS، AKS) بيدير الـ control plane والتحديثات؛ انت بتدير الـ workloads. **node pool** = مجموعة سيرفرات بنفس المقاس (pool صغير للـ main والـ webhooks، وpool بيكبر للـ workers). والقواعد والـ Redis خليهم managed برة الـ cluster — أبسط وأأمن من statefulsets.', '**managed kubernetes** (DigitalOcean, GKE Autopilot, EKS, AKS) runs the control plane and upgrades; you manage the workloads. A **node pool** = a group of same-size servers (a small pool for main and webhooks, an autoscaling pool for workers). Keep databases and Redis managed outside the cluster — simpler and safer than StatefulSets.'),
          'doctl kubernetes cluster create n8n-prod --region fra1 \\\n  --node-pool "name=base;size=s-2vcpu-4gb;count=2" \\\n  --node-pool "name=workers;size=s-4vcpu-8gb;auto-scale=true;min-nodes=1;max-nodes=5"\n# Postgres + Redis: managed services in the same region, private network only')
      ],
      practice: [
        B('اعمل cluster تجريبي (kind أو k3d محليًا).', 'Create a test cluster (kind or k3d locally).'),
        B('شغّل pod n8n بسيط واعمل port-forward.', 'Run a simple n8n pod and port-forward to it.'),
        B('اكتب: Compose ولا Kubernetes لعملائك وليه.', 'Write: Compose or Kubernetes for your clients, and why.'),
        B('اعرف أسعار managed Kubernetes عند مزوّدين.', 'Check managed Kubernetes prices at two providers.')
      ],
      words: [
        W('kubernetes', 'نظام تشغيل containers على سيرفرات كتير', 'a system running containers across many servers', 'The agency runs n8n on Kubernetes.'),
        W('pod', 'أصغر وحدة تشغيل في Kubernetes', 'the smallest runnable unit in Kubernetes', 'Each worker is a pod.'),
        W('ingress', 'بوابة الدخول من النت للخدمات', 'the entry point from the internet to services', 'The ingress routes /webhook/*.'),
        W('namespace', 'مساحة منفصلة جوه الـ cluster', 'an isolated space inside the cluster', 'One namespace per client.'),
        W('managed kubernetes', 'Kubernetes بيديره مزوّد', 'Kubernetes run by a provider', 'Use managed Kubernetes, not your own control plane.'),
        W('node pool', 'مجموعة سيرفرات بنفس المقاس في الـ cluster', 'a group of same-size servers in a cluster', 'Workers run in their own node pool.')
      ],
      read: [{ t: 'Kubernetes: Concepts overview', url: 'https://kubernetes.io/docs/concepts/overview/', what: B('اقرا Objects.', 'Read Objects.') }, { t: 'kind: Quick start', url: 'https://kind.sigs.k8s.io/docs/user/quick-start/', what: B('cluster على جهازك.', 'A cluster on your machine.') }],
      challenge: B('اكتب «قرار المنصة» لوكالتك كـ ADR: Compose ولا Kubernetes، بالأرقام (عدد العملاء، التشغيلات، الفريق، التكلفة الشهرية) — ومتى تعيد التقييم.', 'Write a «platform decision» ADR for your agency: Compose or Kubernetes, with numbers (clients, runs, team, monthly cost) — and when to revisit it.'),
      quiz: [
        Q(B('عميل واحد متوسط:', 'One mid-sized client:'), [['Compose + managed DB غالبًا أبسط', 'Compose + a managed DB is usually simpler'], ['Kubernetes لازم', 'Kubernetes is required'], ['سيرفر من غير Docker', 'a server without Docker']], 0, B('بساطة.', 'Simplicity.')),
        Q(B('فصل 15 عميل في cluster واحد:', 'Separating 15 clients in one cluster:'), [['namespace لكل عميل', 'a namespace per client'], ['pod واحد للكل', 'one pod for all'], ['مستحيل', 'impossible']], 0, B('عزل.', 'Isolation.')),
        Q(B('Postgres لـ n8n على Kubernetes:', 'Postgres for n8n on Kubernetes:'), [['managed برة الـ cluster غالبًا', 'usually managed, outside the cluster'], ['pod عادي من غير volume', 'a plain pod without a volume'], ['مش لازم', 'not needed']], 0, B('بيانات.', 'Data.'))
      ] },

    { title: B('نشر n8n', 'Deploying n8n'),
      goal: B('queue mode كامل على Kubernetes.', 'Full queue mode on Kubernetes.'),
      learn: [
        L(B('الإعدادات والأسرار', 'Config and secrets'),
          B('**configmap** للإعدادات العادية (EXECUTIONS_MODE، الـ hosts، الـ timezone)، و**secret object** للأسرار (مفتاح التشفير، كلمات سر القاعدة وRedis). والأحسن: External Secrets Operator بيجيبهم من Vault (أسبوع 41). وSecret في Kubernetes base64 مش تشفير — فعّل encryption at rest في الـ cluster وقيّد مين يقراه.', 'A **configmap** for ordinary settings (EXECUTIONS_MODE, hosts, timezone), and a **secret object** for secrets (the encryption key, database and Redis passwords). Better: the External Secrets Operator pulls them from Vault (week 41). A Kubernetes Secret is base64, not encryption — enable encryption at rest in the cluster and restrict who can read it.'),
          'apiVersion: v1\nkind: ConfigMap\nmetadata: { name: n8n-config, namespace: n8n-clienta }\ndata:\n  EXECUTIONS_MODE: "queue"\n  QUEUE_BULL_REDIS_HOST: "redis.private.example"\n  DB_TYPE: "postgresdb"\n  DB_POSTGRESDB_HOST: "pg.private.example"\n  GENERIC_TIMEZONE: "Africa/Cairo"\n  N8N_METRICS: "true"\n---\n# n8n-secrets (N8N_ENCRYPTION_KEY, DB_POSTGRESDB_PASSWORD, QUEUE_BULL_REDIS_PASSWORD)\n# created by External Secrets from Vault — never committed to Git'),
        L(B('الـ deployments', 'The deployments'),
          B('3 deployments من نفس الـ image بأوامر مختلفة: main (`n8n start`)، webhook (`n8n webhook`)، worker (`n8n worker --concurrency=10`). كل واحد بـ **resource requests**/**resource limits** (عشان Kubernetes يعرف يحطه فين ومياكلش السيرفر)، و**liveness probe** و**readiness probe** على `/healthz`.', 'Three deployments from the same image with different commands: main (`n8n start`), webhook (`n8n webhook`), worker (`n8n worker --concurrency=10`). Each with **resource requests** and **resource limits** (so Kubernetes knows where to place it and it cannot eat the server), and a **liveness probe** and **readiness probe** on `/healthz`.'),
          'apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: n8n-worker, namespace: n8n-clienta }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: n8n, role: worker } }\n  template:\n    metadata: { labels: { app: n8n, role: worker } }\n    spec:\n      terminationGracePeriodSeconds: 90          # let running executions finish\n      containers:\n        - name: n8n\n          image: n8nio/n8n:1.112.4\n          args: ["worker", "--concurrency=10"]\n          envFrom: [{ configMapRef: { name: n8n-config } }, { secretRef: { name: n8n-secrets } }]\n          resources: { requests: { cpu: "500m", memory: "1Gi" }, limits: { memory: "2Gi" } }\n          livenessProbe: { httpGet: { path: /healthz, port: 5678 }, periodSeconds: 20 }'),
        L(B('Helm والـ ingress', 'Helm and the ingress'),
          B('بدل ما تكتب 10 ملفات YAML لكل عميل: **helm chart** (قالب بقيم) — `values-clienta.yaml` فيه الاختلافات بس. والـ ingress بـ **cert-manager** بيعمل شهادات Let’s Encrypt لوحده، وقواعد: `/webhook/*` للـ webhook processors، والباقي للـ main (ومحمي بـ IP allowlist).', 'Instead of writing 10 YAML files per client: a **helm chart** (a template with values) — `values-clienta.yaml` holds only the differences. The ingress with **cert-manager** gets Let’s Encrypt certificates by itself, and rules: `/webhook/*` to webhook processors, everything else to the main (protected by an IP allow-list).'),
          '# values-clienta.yaml (community or your own chart)\nhost: n8n.client-a.com\nimage: { tag: "1.112.4" }\nworker: { replicas: 3, concurrency: 10, autoscaling: { enabled: true, min: 2, max: 10 } }\nwebhook: { replicas: 2 }\ningress:\n  className: nginx\n  annotations: { cert-manager.io/cluster-issuer: letsencrypt, nginx.ingress.kubernetes.io/whitelist-source-range: "203.0.113.0/24" }\nhelm upgrade --install n8n ./charts/n8n -n n8n-clienta -f values-clienta.yaml')
      ],
      practice: [
        B('اكتب ConfigMap وSecret (من غير قيم حقيقية في Git).', 'Write a ConfigMap and a Secret (no real values in Git).'),
        B('انشر main وwebhook وworker على kind.', 'Deploy main, webhook and worker on kind.'),
        B('ضيف requests/limits وprobes.', 'Add requests/limits and probes.'),
        B('حوّل الملفات لـ Helm values لعميلين.', 'Turn the files into Helm values for two clients.')
      ],
      words: [
        W('configmap', 'إعدادات عادية لـ pods', 'ordinary settings for pods', 'The ConfigMap sets queue mode.'),
        W('secret object', 'كائن Kubernetes للأسرار', 'a Kubernetes object for secrets', 'The encryption key is in a secret object.'),
        W('resource requests', 'الموارد المضمونة للـ pod', 'the resources guaranteed to a pod', 'Resource requests place pods on nodes.'),
        W('resource limits', 'أقصى موارد للـ pod', 'the maximum resources for a pod', 'Memory limits stop runaway workers.'),
        W('liveness probe', 'فحص لو الـ pod لسه عايش', 'a check that a pod is still alive', 'A failing liveness probe restarts it.'),
        W('readiness probe', 'فحص لو الـ pod جاهز يستقبل', 'a check that a pod is ready for traffic', 'The readiness probe waits for migrations.'),
        W('helm chart', 'قالب Kubernetes بقيم', 'a templated Kubernetes package', 'One Helm chart serves every client.'),
        W('cert-manager', 'أداة شهادات TLS تلقائية في Kubernetes', 'a tool for automatic TLS certificates in Kubernetes', 'cert-manager renews the certificate.')
      ],
      read: [{ t: 'n8n hosting: Kubernetes examples', url: 'https://github.com/n8n-io/n8n-hosting', what: B('شوف أمثلة n8n الرسمية.', 'See n8n’s official examples.') }, { t: 'Kubernetes: Configure liveness and readiness probes', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/', what: B('اقرا define a liveness HTTP request.', 'Read define a liveness HTTP request.') }],
      challenge: B('انشر n8n queue mode كامل على kind/k3d بـ Helm: ConfigMap، Secret (من ملف محلي مش Git)، 3 deployments بـ resources وprobes، ingress بـ TLS (self-signed محليًا)، وPostgres/Redis — وشغّل workflow من webhook للـ worker.', 'Deploy full queue-mode n8n on kind/k3d with Helm: a ConfigMap, a Secret (from a local file, not Git), 3 deployments with resources and probes, an ingress with TLS (self-signed locally), and Postgres/Redis — and run a workflow from a webhook to a worker.'),
      quiz: [
        Q(B('Kubernetes Secret في Git:', 'A Kubernetes Secret in Git:'), [['لأ؛ base64 مش تشفير', 'no; base64 is not encryption'], ['آمن', 'safe'], ['مطلوب', 'required']], 0, B('أسرار.', 'Secrets.')),
        Q(B('worker بياكل كل الذاكرة:', 'A worker eating all memory:'), [['memory limit', 'a memory limit'], ['replicas أكتر', 'more replicas'], ['ingress', 'an ingress']], 0, B('limits.', 'Limits.')),
        Q(B('terminationGracePeriodSeconds للـ worker:', 'terminationGracePeriodSeconds for a worker:'), [['وقت يخلّص التشغيلات', 'time to finish running executions'], ['وقت التشغيل', 'start time'], ['مش مهم', 'irrelevant']], 0, B('graceful.', 'Graceful.'))
      ] },

    { title: B('التوسّع الآلي', 'Autoscaling'),
      goal: B('عدد الـ workers يتبع الشغل لوحده.', 'The worker count follows the work by itself.'),
      learn: [
        L(B('HPA وليه مش كفاية', 'HPA and why it is not enough'),
          B('**horizontal pod autoscaler** (HPA) بيزوّد pods على CPU أو memory. بس worker n8n ممكن يكون مستني API (CPU واطي) والطابور بيكبر — HPA على CPU مش هيشوف المشكلة. اللي يهم فعلًا: طول الطابور.', 'The **horizontal pod autoscaler** (HPA) adds pods based on CPU or memory. But an n8n worker may be waiting on an API (low CPU) while the queue grows — a CPU-based HPA will not see the problem. What really matters: the queue length.'),
          'symptom: queue waiting 2,000 · worker CPU 15% (all waiting on a slow CRM API)\nHPA (CPU 70%) → does nothing ✗\nscale on queue length → 3 → 8 workers → backlog cleared in 6 min ✓ (respect the CRM rate limit!)'),
        L(B('KEDA على Redis', 'KEDA on Redis'),
          B('**keda** بيكبّر على مقاييس خارجية: طول قايمة Redis (طابور Bull) أو استعلام Prometheus. «لكل 50 مهمة مستنية worker، من 2 لـ 10». وKEDA ممكن يصغّر لحد min بسرعة لما الطابور يفضى. وmax لازم يحترم حدود الـ APIs والقاعدة (اتصالات!).', '**keda** scales on outside metrics: the length of a Redis list (the Bull queue) or a Prometheus query. «One worker per 50 waiting jobs, from 2 to 10». KEDA can also shrink to the minimum quickly when the queue empties. And the max must respect API and database limits (connections!).'),
          'apiVersion: keda.sh/v1alpha1\nkind: ScaledObject\nmetadata: { name: n8n-worker, namespace: n8n-clienta }\nspec:\n  scaleTargetRef: { name: n8n-worker }\n  minReplicaCount: 2\n  maxReplicaCount: 10          # 10 workers × pool 10 = 100 DB connections → check max_connections!\n  cooldownPeriod: 300\n  triggers:\n    - type: redis\n      metadata: { address: "redis.private.example:6379", listName: "bull:jobs:wait", listLength: "50" }\n      authenticationRef: { name: redis-auth }'),
        L(B('السيرفرات كمان', 'The servers too'),
          B('لو KEDA طلب 10 workers ومفيش مكان، الـ pods هتستنى. الـ cluster autoscaler بيزوّد سيرفرات في الـ node pool (وبيشيلها لما تفضى). خلّي الـ requests واقعية عشان الحسابات تبقى صح، وحد أقصى للتكلفة (max nodes)، وتنبيه لو وصلت للسقف.', 'If KEDA asks for 10 workers and there is no room, pods wait. The cluster autoscaler adds servers to the node pool (and removes them when idle). Keep requests realistic so the maths is right, cap the cost (max nodes), and alert when you hit the ceiling.'),
          'workers node pool: min 1, max 5 nodes (s-4vcpu-8gb)\neach worker requests 0.5 CPU / 1 GiB → ~6 workers per node\npeak 10 workers → 2 nodes → cost cap: 5 nodes ≈ known monthly maximum\nalert: "workers at max replicas for 15 min" → investigate (slow API? bug? real growth?)')
      ],
      practice: [
        B('اعمل HPA على CPU ولاحظ ليه مش كفاية.', 'Create a CPU HPA and notice why it falls short.'),
        B('ثبّت KEDA واعمل ScaledObject على Redis.', 'Install KEDA and create a ScaledObject on Redis.'),
        B('احسب max workers من اتصالات القاعدة.', 'Calculate max workers from database connections.'),
        B('اعمل تنبيه «وصلنا للسقف».', 'Create a «we hit the ceiling» alert.')
      ],
      words: [
        W('horizontal pod autoscaler', 'أداة Kubernetes لزيادة pods على CPU/memory', 'Kubernetes’ tool adding pods on CPU/memory', 'The horizontal pod autoscaler ignored the queue.'),
        W('keda', 'توسّع آلي على مقاييس خارجية', 'autoscaling on outside metrics', 'KEDA scales on the Redis list.'),
        W('cluster autoscaler', 'زيادة وتقليل سيرفرات الـ cluster', 'adding and removing cluster servers', 'The cluster autoscaler added a node.'),
        W('cooldown period', 'مدة انتظار قبل التصغير', 'a wait before scaling down', 'A cooldown period avoids flapping.'),
        W('cost cap', 'حد أقصى للتكلفة', 'a maximum cost', 'Max nodes is our cost cap.')
      ],
      read: [{ t: 'KEDA: Redis Lists scaler', url: 'https://keda.sh/docs/latest/scalers/redis-lists/', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('على kind: KEDA بيكبّر workers من 2 لـ 8 على طابور Redis — ابعت 2000 webhook (k6 من أسبوع 39) وشوف الـ workers بتزيد وبتقل، وقِس وقت تفريغ الطابور، وتأكد إن الاتصالات أقل من الحد.', 'On kind: KEDA scales workers from 2 to 8 on the Redis queue — send 2,000 webhooks (k6 from week 39) and watch workers grow and shrink, measure the queue drain time, and confirm connections stay under the limit.'),
      quiz: [
        Q(B('workers مستنيين API والطابور بيكبر:', 'Workers waiting on an API while the queue grows:'), [['اكبّر على طول الطابور', 'scale on queue length'], ['HPA على CPU', 'an HPA on CPU'], ['استنى', 'wait']], 0, B('KEDA.', 'KEDA.')),
        Q(B('maxReplicaCount بيتحدد بـ:', 'maxReplicaCount is set by:'), [['حدود الـ APIs واتصالات القاعدة', 'API limits and DB connections'], ['أكبر رقم ممكن', 'the biggest possible number'], ['عدد العملاء', 'the client count']], 0, B('اعتماديات.', 'Dependencies.')),
        Q(B('pods مستنية مكان:', 'Pods waiting for room:'), [['cluster autoscaler يزوّد nodes', 'the cluster autoscaler adds nodes'], ['امسح pods', 'delete pods'], ['مستحيل', 'impossible']], 0, B('سيرفرات.', 'Servers.'))
      ] },

    { title: B('GitOps والتحديثات', 'GitOps and updates'),
      goal: B('كل تغيير في الـ cluster عبر Git ومراجعة.', 'Every cluster change goes through Git and review.'),
      learn: [
        L(B('GitOps', 'GitOps'),
          B('**gitops**: ريبو فيه الحالة المطلوبة للـ cluster (Helm values لكل عميل)، وأداة زي **argo cd** أو Flux بتطبّقها وبتصلّح أي تعديل يدوي. التحديث = PR بيغيّر `image.tag` ← مراجعة ← دمج ← Argo يطبّق. والرجوع = revert. ونفس فكرة workflows as code (أسبوع 38) بس للبنية.', '**gitops**: a repo holding the cluster’s desired state (Helm values per client), and a tool such as **argo cd** or Flux applying it and undoing any manual edit. An update = a PR changing `image.tag` → review → merge → Argo applies. Rollback = a revert. The same idea as workflows as code (week 38), for infrastructure.'),
          'infra-repo/\n  clients/clienta/values.yaml     image.tag: 1.112.4 · workers max 10\n  clients/clientb/values.yaml     image.tag: 1.110.2 (pinned: custom node not yet compatible)\n  apps/argocd-apps.yaml           one Argo Application per client namespace\nPR "bump clienta to 1.112.4" → CI renders the chart + kubeconform → review → merge → Argo syncs'),
        L(B('rolling update', 'Rolling updates'),
          B('**rolling update** في Kubernetes بيبدّل الـ pods واحد واحد: pod جديد يبقى ready (readiness probe) قبل ما القديم يتشال — من غير توقف. للـ workers: `maxUnavailable: 0` و`terminationGracePeriodSeconds` كفاية. وللـ main: n8n بيعمل migrations — استراتيجية `Recreate` للـ main الواحد مع نسخة احتياطية قبلها.', 'A **rolling update** in Kubernetes replaces pods one by one: a new pod becomes ready (readiness probe) before the old one goes — no downtime. For workers: `maxUnavailable: 0` and enough `terminationGracePeriodSeconds`. For the main: n8n runs migrations — use the `Recreate` strategy for the single main, with a backup mark first.'),
          'worker Deployment:\n  strategy: { type: RollingUpdate, rollingUpdate: { maxSurge: 1, maxUnavailable: 0 } }\nmain Deployment (single):\n  strategy: { type: Recreate }      # never two mains migrating the DB at once\nkubectl rollout status deploy/n8n-worker -n n8n-clienta\nkubectl rollout undo deploy/n8n-worker -n n8n-clienta    # emergency (then revert in Git)'),
        L(B('عملاء كتير', 'Many clients'),
          B('لوكالة بعملاء كتير على cluster واحد: namespace لكل عميل، NetworkPolicy تمنع namespaces تكلّم بعض، ResourceQuota لكل عميل (عشان واحد ميخنقش الباقي)، قاعدة وRedis منفصلين (أو قواعد منفصلة على نفس السيرفر المُدار)، ومفاتيح تشفير مختلفة. وتحديث العملاء على مراحل: عميل تجريبي الأول.', 'For an agency with many clients on one cluster: a namespace per client, NetworkPolicies stopping namespaces from talking to each other, a ResourceQuota per client (so one cannot starve the rest), separate databases and Redis (or separate databases on the same managed server), and different encryption keys. Update clients in waves: a canary client first.'),
          'per client: Namespace · ResourceQuota (cpu 8, memory 16Gi) · NetworkPolicy (deny other namespaces)\n            own DB + Redis db index/instance · own N8N_ENCRYPTION_KEY · own ingress host\nupgrade waves: internal → clientA (canary, 24 h) → the rest')
      ],
      practice: [
        B('اعمل ريبو infra بـ values لعميلين.', 'Create an infra repo with values for two clients.'),
        B('ثبّت Argo CD على kind واربطه بالريبو.', 'Install Argo CD on kind and connect it to the repo.'),
        B('اعمل تحديث بـ PR وrollback بـ revert.', 'Do an update via a PR and a rollback via a revert.'),
        B('ضيف ResourceQuota وNetworkPolicy لكل عميل.', 'Add a ResourceQuota and NetworkPolicy per client.')
      ],
      words: [
        W('gitops', 'Git هو مصدر حالة البنية', 'Git as the source of infrastructure state', 'With GitOps, updates are PRs.'),
        W('argo cd', 'أداة GitOps بتطبّق Git على Kubernetes', 'a GitOps tool applying Git to Kubernetes', 'Argo CD synced the new tag.'),
        W('rolling update', 'تبديل الـ pods واحد واحد', 'replacing pods one by one', 'A rolling update keeps webhooks up.'),
        W('resource quota', 'حد موارد لـ namespace', 'a resource limit per namespace', 'Each client has a resource quota.'),
        W('network policy', 'قواعد مين يكلّم مين في الـ cluster', 'rules for who may talk to whom in a cluster', 'A network policy isolates clients.')
      ],
      read: [{ t: 'Argo CD: Getting started', url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/', what: B('اقرا الخطوات.', 'Read the steps.') }, { t: 'Kubernetes: Network policies', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('اعمل منصة متعددة العملاء على kind: ريبو GitOps بعميلين، Argo CD، namespace وquota وnetwork policy لكل عميل، تحديث canary لعميل واحد ثم التاني، وrollback بـ revert — ووثّق كل خطوة.', 'Build a multi-client platform on kind: a GitOps repo with two clients, Argo CD, a namespace, quota and network policy per client, a canary update for one client then the other, and a rollback via revert — documenting each step.'),
      quiz: [
        Q(B('تعديل يدوي بـ kubectl edit في GitOps:', 'A manual kubectl edit under GitOps:'), [['Argo بيرجّعه لحالة Git', 'Argo reverts it to Git’s state'], ['بيفضل', 'it stays'], ['بيتحفظ في Git', 'it is saved to Git']], 0, B('Git المرجع.', 'Git is the source.')),
        Q(B('الـ main الواحد عند التحديث:', 'The single main during an update:'), [['Recreate مع نسخة قبلها', 'Recreate, with a backup first'], ['اتنين مع بعض', 'two at once'], ['من غير backup', 'no backup']], 0, B('migrations.', 'Migrations.')),
        Q(B('عميل بيخنق موارد الباقي:', 'One client starving the rest:'), [['ResourceQuota', 'a ResourceQuota'], ['ingress', 'an ingress'], ['configmap', 'a configmap']], 0, B('حدود.', 'Limits.'))
      ] },

    { title: B('التشغيل اليومي', 'Day-to-day operations'),
      goal: B('cluster بيتراقب ويتصلّح من غير دراما.', 'A cluster monitored and fixed without drama.'),
      learn: [
        L(B('أوامر الطوارئ', 'Emergency commands'),
          B('كل اللي بيدير n8n على Kubernetes لازم يعرف: يشوف الـ pods وحالتها، يقرا لوج pod، يدخل pod، يعيد تشغيل deployment، يشوف events (ليه pod مش بيقوم)، ويوقف worker يدويًا. حطهم في runbook (أسبوع 40).', 'Anyone running n8n on Kubernetes must know how to: list pods and their state, read a pod’s logs, open a shell in a pod, restart a deployment, read events (why a pod will not start), and stop a worker manually. Put them in the runbook (week 40).'),
          'kubectl get pods -n n8n-clienta -o wide\nkubectl logs deploy/n8n-worker -n n8n-clienta --tail=100 -f\nkubectl describe pod <pod> -n n8n-clienta        # events: OOMKilled? ImagePullBackOff? probe failed?\nkubectl rollout restart deploy/n8n-webhook -n n8n-clienta\nkubectl top pods -n n8n-clienta                   # CPU/memory now\nkubectl exec -it deploy/n8n-main -n n8n-clienta -- n8n audit'),
        L(B('مشاكل شائعة', 'Common problems'),
          B('OOMKilled (الـ worker عدّى memory limit: items كبيرة — أسبوع 39)، CrashLoopBackOff (إعداد غلط، القاعدة مش واصلة، مفتاح تشفير غلط)، Pending (مفيش مكان: requests كبيرة أو node pool وصل الحد)، والـ webhooks 502 (الـ readiness probe بايظ أو الـ ingress). كل واحدة ليها سبب في الـ events أو اللوج.', 'OOMKilled (a worker exceeded its memory limit: big items — week 39), CrashLoopBackOff (a wrong setting, the database unreachable, a wrong encryption key), Pending (no room: big requests or the node pool at its limit), and webhook 502s (a broken readiness probe or the ingress). Each has its cause in the events or logs.'),
          'OOMKilled          → kubectl describe → Last State: OOMKilled → find the big item / raise limit carefully\nCrashLoopBackOff   → kubectl logs --previous → "Mismatching encryption keys" → fix the Secret\nPending            → describe → "0/3 nodes available: insufficient memory" → lower requests or add nodes\n502 on webhooks    → kubectl get endpoints n8n-webhook → empty? readiness failing → check /healthz'),
        L(B('المراقبة على Kubernetes', 'Monitoring on Kubernetes'),
          B('نفس مراقبة أسبوع 40 بأدوات Kubernetes: kube-prometheus-stack (Prometheus وGrafana وAlertmanager) بيجمع مقاييس n8n والـ pods والـ nodes، وتنبيهات: pods بتعيد تشغيل كتير، OOMKilled، replicas عند السقف، certificate قرب يخلص، disk الـ nodes. واللوج بـ Loki زي ما هو.', 'The same monitoring as week 40 with Kubernetes tools: kube-prometheus-stack (Prometheus, Grafana and Alertmanager) collecting n8n, pod and node metrics, with alerts: pods restarting often, OOMKilled, replicas at the ceiling, a certificate about to expire, node disk. Logs with Loki as before.'),
          'alerts (PrometheusRule)\n- KubePodCrashLooping (n8n pods)            → critical\n- container OOMKilled in n8n-clienta         → warning, link to week 39 notes\n- n8n-worker replicas == max for 15 m       → warning (capacity)\n- certmanager certificate expires < 14 d    → warning\n- n8n failure rate > 5% (week 40 rule)       → critical')
      ],
      practice: [
        B('تدرّب على أوامر الطوارئ الستة.', 'Practise the six emergency commands.'),
        B('اعمل OOMKilled متعمد وشخّصه.', 'Cause an OOMKilled on purpose and diagnose it.'),
        B('اعمل CrashLoop بمفتاح تشفير غلط وصلّحه.', 'Cause a CrashLoop with a wrong encryption key and fix it.'),
        B('ثبّت kube-prometheus-stack وضيف 3 تنبيهات.', 'Install kube-prometheus-stack and add 3 alerts.')
      ],
      words: [
        W('oomkilled', 'الـ pod اتقفل لأنه عدّى حد الذاكرة', 'a pod killed for exceeding its memory limit', 'The worker was OOMKilled on a 200 MB item.'),
        W('crashloopbackoff', 'الـ pod بيقع ويعيد باستمرار', 'a pod crashing and restarting repeatedly', 'A wrong key caused CrashLoopBackOff.'),
        W('pending pod', 'pod مستني مكان يشتغل فيه', 'a pod waiting for room to run', 'A pending pod means no free memory.'),
        W('kubectl', 'أداة سطر أوامر Kubernetes', 'the Kubernetes command-line tool', 'kubectl logs shows the worker output.'),
        W('kube-prometheus-stack', 'حزمة مراقبة كاملة لـ Kubernetes', 'a complete monitoring bundle for Kubernetes', 'kube-prometheus-stack ships Grafana.')
      ],
      read: [{ t: 'Kubernetes: Debug pods', url: 'https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/', what: B('اقرا My pod stays pending وcrashing.', 'Read My pod stays pending and crashing.') }],
      challenge: B('اعمل «يوم أعطال» على kind: 4 مشاكل متعمدة (OOM، مفتاح غلط، Pending، readiness بايظ)، شخّص وصلّح كل واحدة بأوامر الـ runbook، وضيف تنبيه لكل واحدة.', 'Run a «failure day» on kind: 4 deliberate problems (OOM, a wrong key, Pending, a broken readiness probe), diagnose and fix each with runbook commands, and add an alert for each.'),
      quiz: [
        Q(B('pod اتقفل بـ OOMKilled:', 'A pod ended with OOMKilled:'), [['عدّى memory limit', 'it exceeded the memory limit'], ['CPU عالي', 'high CPU'], ['شبكة', 'network']], 0, B('ذاكرة.', 'Memory.')),
        Q(B('ليه pod مش بيقوم؟', 'Why will a pod not start?'), [['kubectl describe (events)', 'kubectl describe (events)'], ['أعد تشغيل الـ cluster', 'restart the cluster'], ['امسح الـ namespace', 'delete the namespace']], 0, B('events.', 'Events.')),
        Q(B('webhooks بترجّع 502:', 'Webhooks return 502:'), [['endpoints فاضية؟ readiness', 'empty endpoints? readiness'], ['القاعدة', 'the database'], ['DNS دايمًا', 'always DNS']], 0, B('تشخيص.', 'Diagnosis.'))
      ] },

    { title: B('مراجعة الشهر الحادي عشر ومشروعه', 'Month 11 review and project'),
      goal: B('n8n بمستوى مؤسسات: آمن وخاص ومستمر وبيكبر.', 'Enterprise-grade n8n: secure, private, continuous and scalable.'),
      review: [
        B('الأمان: threat model، الأسرار، الأدوار وSSO، webhooks وCode، التدقيق (أسبوع 41).', 'Security: threat model, secrets, roles and SSO, webhooks and Code, audits (week 41).'),
        B('الخصوصية: القوانين، التقليل، الاحتفاظ، الطلبات، masking، DPA وDPIA (أسبوع 42).', 'Privacy: laws, minimisation, retention, requests, masking, DPA and DPIA (week 42).'),
        B('الاستمرارية: RTO/RPO، HA، PITR و3-2-1، DR والتمارين، تحديث من غير توقف (أسبوع 43).', 'Continuity: RTO/RPO, HA, PITR and 3-2-1, DR and drills, zero-downtime upgrades (week 43).'),
        B('Kubernetes: إمتى، الـ deployments والأسرار، Helm وingress.', 'Kubernetes: when, deployments and secrets, Helm and ingress.'),
        B('KEDA على الطابور، GitOps، تعدد العملاء، والتشغيل اليومي.', 'KEDA on the queue, GitOps, multi-tenancy and day-to-day operations.')
      ],
      project: B('مشروع الشهر الحادي عشر «منصة n8n مؤسسية» (على Compose أو Kubernetes حسب قرارك الموثّق): threat model وتقوية (SSO/2FA، projects، أسرار في store، webhooks بمصادقة، Code محدود، n8n audit نضيف)، خصوصية (خريطة بيانات، احتفاظ آلي، مركز طلبات، masking، DPIA)، استمرارية (RTO/RPO، PITR و3-2-1 immutable، DR runbook وتمرين مقاس، ترقية من غير توقف)، وتوسّع (queue mode بـ autoscaling على الطابور، GitOps لو Kubernetes) — وملف واحد للعميل «إزاي بنحمي ونشغّل أتمتتك».', 'Month 11 project «enterprise n8n platform» (on Compose or Kubernetes per your documented decision): a threat model and hardening (SSO/2FA, projects, secrets in a store, authenticated webhooks, a limited Code node, a clean n8n audit), privacy (a data map, automatic retention, a request centre, masking, a DPIA), continuity (RTO/RPO, PITR and immutable 3-2-1, a DR runbook with a measured drill, zero-downtime upgrades), and scaling (queue mode autoscaled on the queue, GitOps if Kubernetes) — plus one document for the client: «how we protect and run your automation».'),
      test: [
        Q(B('أصغر وحدة تشغيل في Kubernetes:', 'The smallest runnable unit in Kubernetes:'), [['pod', 'a pod'], ['node', 'a node'], ['namespace', 'a namespace']], 0, B('containers.', 'Containers.')),
        Q(B('عميل واحد صغير:', 'One small client:'), [['Compose + managed DB', 'Compose + a managed DB'], ['Kubernetes متعدد المناطق', 'multi-region Kubernetes'], ['من غير backups', 'no backups']], 0, B('مناسب.', 'Fitting.')),
        Q(B('الإعدادات العادية:', 'Ordinary settings:'), [['ConfigMap', 'ConfigMap'], ['Secret', 'Secret'], ['Ingress', 'Ingress']], 0, B('مش سرية.', 'Not secret.')),
        Q(B('pod ممنوع ياخد أكتر من 2Gi:', 'A pod must not exceed 2Gi:'), [['memory limit', 'a memory limit'], ['request', 'a request'], ['probe', 'a probe']], 0, B('حد.', 'A cap.')),
        Q(B('pod مش جاهز ميستقبلش traffic:', 'A not-ready pod gets no traffic via:'), [['readiness probe', 'the readiness probe'], ['liveness probe', 'the liveness probe'], ['HPA', 'the HPA']], 0, B('جاهزية.', 'Readiness.')),
        Q(B('قالب لعملاء كتير:', 'A template for many clients:'), [['Helm chart بـ values', 'a Helm chart with values'], ['نسخ YAML', 'copied YAML'], ['يدوي', 'by hand']], 0, B('قيم.', 'Values.')),
        Q(B('شهادات TLS تلقائية:', 'Automatic TLS certificates:'), [['cert-manager', 'cert-manager'], ['KEDA', 'KEDA'], ['Argo', 'Argo']], 0, B('Let’s Encrypt.', 'Let’s Encrypt.')),
        Q(B('توسّع workers على طابور Redis:', 'Scaling workers on the Redis queue:'), [['KEDA', 'KEDA'], ['HPA على CPU', 'a CPU HPA'], ['cron', 'cron']], 0, B('مقياس خارجي.', 'An outside metric.')),
        Q(B('التحديث بـ PR والتطبيق آلي:', 'Updates via PR, applied automatically:'), [['GitOps', 'GitOps'], ['SSH', 'SSH'], ['FTP', 'FTP']], 0, B('Argo CD.', 'Argo CD.')),
        Q(B('عزل العملاء في cluster:', 'Isolating clients in a cluster:'), [['namespace + quota + network policy', 'namespace + quota + network policy'], ['labels بس', 'labels only'], ['أسماء مختلفة', 'different names']], 0, B('طبقات.', 'Layers.')),
        Q(B('CrashLoopBackOff بعد تغيير Secret:', 'CrashLoopBackOff after a Secret change:'), [['logs --previous؛ غالبًا مفتاح غلط', 'logs --previous; likely a wrong key'], ['زوّد replicas', 'add replicas'], ['امسح الـ cluster', 'delete the cluster']], 0, B('تشخيص.', 'Diagnosis.')),
        Q(B('n8n main واحد عند التحديث:', 'A single n8n main during an update:'), [['Recreate', 'Recreate'], ['RollingUpdate باتنين', 'RollingUpdate with two'], ['من غير backup', 'no backup']], 0, B('migrations.', 'Migrations.'))
      ] }
  ]
};
