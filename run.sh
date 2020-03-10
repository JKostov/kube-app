minikube stop
minikube delete
minikube start --vm-driver=virtualbox
kubectl apply -f ./kubernetes/
minikube dashboard

# kubectl get services
# minikube service kube-frontend:80
# kubectl logs <pod-name>
