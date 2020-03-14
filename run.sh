minikube stop
minikube delete
minikube start --vm-driver=virtualbox
minikube addons enable ingress
kubectl apply -f ./kubernetes/
minikube dashboard

# kubectl get services
# minikube service kube-frontend
# kubectl logs <pod-name>
